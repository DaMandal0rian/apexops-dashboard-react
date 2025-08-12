import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths({ ignoreConfigErrors: true })],
  // Treat JSX in both legacy .js files and modern .jsx modules
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.(js|jsx)$/,
    jsx: 'automatic',
  },
  optimizeDeps: {
    esbuildOptions: {
      jsx: 'automatic',
      loader: {
        '.js': 'jsx',
        '.jsx': 'jsx',
      },
    },
  },
  build: {
    rollupOptions: {
      // Prevent Vite from processing other HTML docs as entries
      input: 'index.html',
    },
  },
});
