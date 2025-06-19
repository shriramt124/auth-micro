import { defineConfig } from 'vite';
import federation from '@originjs/vite-plugin-federation';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: 'remoteApp',
      filename: 'remoteEntry.js',
      exposes: {
        "./Login": "./src/components/Login.jsx",
        "./Signup": "./src/components/Signup.jsx",
          "./OtpLogin": "./src/components/OtpLogin.jsx",
      },
      shared: ['react', 'react-dom', 'react-router-dom'],
    }),
  ],
  server: {
    port: 3001,
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
});