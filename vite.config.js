import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        mercury: resolve(__dirname, 'planets/mercury.html'),
        venus: resolve(__dirname, 'planets/venus.html'),
        earth: resolve(__dirname, 'planets/earth.html'),
        mars: resolve(__dirname, 'planets/mars.html'),
        jupiter: resolve(__dirname, 'planets/jupiter.html'),
        saturn: resolve(__dirname, 'planets/saturn.html'),
        uranus: resolve(__dirname, 'planets/uranus.html'),
        neptune: resolve(__dirname, 'planets/neptune.html'),
      },
    },
  },
  server: {
    open: false,
  },
});
