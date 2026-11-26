import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig, type Plugin} from 'vite';
import {siteConfig} from './src/siteConfig';

// Makes `npm run preview` behave like the host: a missing address gets 404.html
// with a 404 status.
const previewNotFound = (): Plugin => ({
  name: 'preview-404-page',
  configurePreviewServer(server) {
    const dist = path.resolve(server.config.root, server.config.build.outDir);
    server.middlewares.use((req, res, next) => {
      let route = '/';
      try {
        route = decodeURIComponent(new URL(req.url ?? '/', 'http://localhost').pathname);
      } catch {
        route = '/404'; // an address that can't be decoded doesn't exist
      }
      const target = path.join(dist, route);
      const isFile = (file: string) => fs.existsSync(file) && fs.statSync(file).isFile();
      if (target.startsWith(dist)) {
        if (isFile(target)) return next();
        if (isFile(path.join(target, 'index.html'))) {
          if (route.endsWith('/')) return next();
          // /privacy redirects to /privacy/, as the host does.
          res.statusCode = 308;
          res.setHeader('Location', `${route.replace(/\/+/g, '/')}/`);
          return res.end();
        }
      }
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.end(fs.readFileSync(path.join(dist, '404.html')));
    });
  },
});

export default defineConfig(() => {
  // Work card images that exist, so missing ones show a placeholder instead of a 404.
  const workDir = path.resolve(import.meta.dirname, 'public/work');
  const workImages = fs.existsSync(workDir) ? fs.readdirSync(workDir) : [];

  return {
    // Separate HTML pages, not a single-page app: unknown addresses return 404
    // instead of falling back to index.html.
    appType: 'mpa' as const,
    plugins: [react(), tailwindcss(), previewNotFound()],
    define: {
      __WORK_IMAGES__: JSON.stringify(workImages),
      // Vercel sets VERCEL=1 during its builds. Analytics only loads there.
      __ON_VERCEL__: JSON.stringify(Boolean(process.env.VERCEL)),
    },
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, 'src'),
      },
    },
    build: {
      // Keep fonts as separate files, not base64 inside the render-blocking stylesheet.
      assetsInlineLimit: 0,
      rollupOptions: {
        // The homepage plus the three legal pages (served at /privacy/, /cookies/, /terms/).
        input: {
          main: path.resolve(import.meta.dirname, 'index.html'),
          notFound: path.resolve(import.meta.dirname, '404.html'),
          ...(siteConfig.showWork ? {work: path.resolve(import.meta.dirname, 'work/index.html')} : {}),
          privacy: path.resolve(import.meta.dirname, 'privacy/index.html'),
          cookies: path.resolve(import.meta.dirname, 'cookies/index.html'),
          terms: path.resolve(import.meta.dirname, 'terms/index.html'),
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
