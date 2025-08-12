import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      assets: path.resolve(__dirname, 'src/assets'),
      components: path.resolve(__dirname, 'src/components'),
      contexts: path.resolve(__dirname, 'src/contexts'),
      layouts: path.resolve(__dirname, 'src/layouts'),
      views: path.resolve(__dirname, 'src/views'),
    },
  },
  esbuild: {
    loader: 'jsx',
    jsx: 'automatic',
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: { '.js': 'jsx', '.jsx': 'jsx' },
      jsx: 'automatic',
    },
  },
  build: {
    rollupOptions: {
      // Prevent Vite from processing other HTML docs as entries
      input: 'index.html',
    },
  },
});
