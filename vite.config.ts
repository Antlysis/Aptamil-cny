import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  base: '/contest/',
  build: {
    minify: true,
    sourcemap: false,
    target: 'modules',
    rollupOptions: {
      onwarn(warning, warn) {
        if (
          warning.code === 'DYNAMIC_IMPORT_VARS' &&
          warning.message.includes('c3runtime.js')
        ) {
          return;
        }
        warn(warning);
      },
    },
  },
});
