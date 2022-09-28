import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

function pathResolve(dir: string) {
  return resolve(__dirname, '.', dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'build',
    target: 'esnext',
  },
  resolve: {
    alias: {
      '@/*': pathResolve('./src'),
      '@/components': pathResolve('./src/components'),
      '@/types': pathResolve('./src/types'),
      '@/hooks': pathResolve('./src/hooks'),
      '@/utils': pathResolve('./src/utils'),
    },
  },
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
  },
});
