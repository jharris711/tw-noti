/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path, { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/lib/index.ts'),
      name: 'tw-noti',
      fileName: 'tw-noti'
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'react'
        }
      }
    }
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/')
    }
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: 'src/setupTests.ts',
    testTimeout: 10000,
    coverage: {
      provider: 'v8',
      exclude: [
        '.eslintrc.cjs',
        'postcss.config.js',
        'tailwind.config.js',
        'src/main.tsx',
        'src/lib/**'
      ]
    }
  }
});
