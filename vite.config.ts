import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig} from 'vite';
import {siteConfig} from './src/siteConfig';

export default defineConfig(() => {
  // Work card images that exist, so missing ones show a placeholder instead of a 404.
  const workDir = path.resolve(import.meta.dirname, 'public/work');
  const workImages = fs.existsSync(workDir) ? fs.readdirSync(workDir) : [];

  return {
    plugins: [react(), tailwindcss()],
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
