// ESLint Flat Config for backend (Node.js, CommonJS)
const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
  {
    ignores: [
      'frontend/**',
      'node_modules/**',
      'test/**',
      'frontend/build/**',
      'backend/data/scrappingChaldal.js',
    ],
  },
  js.configs.recommended,
  {
    files: ['backend/**/*.js', '*.js'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    rules: {
      // Ignore typical Express handler params and any arg prefixed with _
      'no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^(next|req|res)$|^_' }
      ],
      'no-console': 'off',
    },
  },
  {
    files: ['backend/utils/seeder.js'],
    languageOptions: {
      globals: {
        ...globals.node,
        fetch: 'readonly',
      },
    },
  },
];
