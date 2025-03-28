import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: [
          [
            '@emotion/babel-plugin',
            {
              sourceMap: true,
              autoLabel: 'dev-only',
              labelFormat: '[local]',
              cssPropOptimization: true,
            },
          ],
        ],
      },
    }),
  ],
  base: '/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
    sourcemap: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  assetsInclude: ['**/*.jpg', '**/*.png', '**/*.gif', '**/*.svg', '**/*.ico'],
  server: {
    port: 3000,
    strictPort: true,
    host: true
  }
});
