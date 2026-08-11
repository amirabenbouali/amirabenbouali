import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('@react-three/fiber')) {
            return 'r3f-vendor';
          }

          if (id.includes('node_modules/three')) {
            return 'three-vendor';
          }

          if (id.includes('node_modules/framer-motion') || id.includes('node_modules/motion-dom')) {
            return 'motion-vendor';
          }
        }
      }
    }
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
    exclude: ['node_modules', 'dist', 'tests/e2e/**']
  }
});
