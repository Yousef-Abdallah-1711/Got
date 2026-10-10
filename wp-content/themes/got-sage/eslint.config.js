import js from '@eslint/js';
import globals from 'globals';

export default [
  {
    ignores: ['public/build/**'],
  },
  js.configs.recommended,
  {
    files: ['resources/js/**/*.js', 'tests/**/*.js', 'playwright.config.js', 'vite.config.js', 'eslint.config.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
];
