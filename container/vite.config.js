import { defineConfig } from 'vite';
import federation from '@originjs/vite-plugin-federation';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'hostApp',
      remotes: {
        remoteApp: 'http://localhost:3001/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  resolve: {
    alias: {
      '@auth': resolve(__dirname, '../auth/src'),
    },
  },
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
});