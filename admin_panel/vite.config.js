import { defineConfig } from 'vite';
import federation from '@originjs/vite-plugin-federation';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: 'adminApp',
      filename: 'remoteEntry.js',
      exposes: {
        "./AffiliateDashboard": "./src/components/AffiliateDashboard.jsx",
        "./AdminPanel": "./src/App.jsx",
      },
      shared: ['react', 'react-dom', 'react-router-dom'],
    }),
  ],
  server: {
    port: 3002,
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
});