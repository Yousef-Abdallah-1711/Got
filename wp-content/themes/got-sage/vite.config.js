import tailwindcss from '@tailwindcss/vite';
import { wordpressPlugin } from '@roots/vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [wordpressPlugin(), tailwindcss()],
  build: {
    outDir: 'public/build',
    emptyOutDir: true,
    manifest: 'manifest.json',
    rollupOptions: {
      input: [
        'resources/css/app.css',
        'resources/js/app.js',
      ],
    },
  },
});
