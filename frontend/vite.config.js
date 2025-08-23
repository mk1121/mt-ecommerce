import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react({
      include: [/\.jsx?$/],
    }),
  ],
  esbuild: {
    jsx: 'automatic',
    include: /src\/.*\.(js|jsx)$/,
    // Treat .js files in src as JSX
    loader: 'jsx',
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: process.env.VITE_API_PROXY || 'http://127.0.0.1:4002',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
  },
});
