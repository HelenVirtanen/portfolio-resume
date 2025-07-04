export default [
  {
    ignores: ['dist/**', 'node_modules/**', 'public/**'],
    files: ['src/**/*.js'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',
      },
    },
    rules: {
      'prefer-const': 'warn',
      'no-unused-vars': 'warn',
      'no-console': 'off',
    },
  },
];
