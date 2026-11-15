import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, 'src'),
      },
    },
    build: {
      rollupOptions: {
        // The homepage plus the three legal pages (served at /privacy/, /cookies/, /terms/).
        input: {
          main: path.resolve(import.meta.dirname, 'index.html'),
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
