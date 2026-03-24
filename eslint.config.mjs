import js from '@eslint/js';
import jsonPlugin from 'eslint-plugin-json';
import jsoncParser from 'jsonc-eslint-parser';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        console: 'readonly',
        // jQuery
        $: 'readonly',
        jQuery: 'readonly',
      },
    },
    plugins: {
      json: jsonPlugin,
    },
    rules: {
      'json/*': ['error', { allowComments: false }],
      'arrow-spacing': ['error', { before: true, after: true }],
      'arrow-parens': ['warn', 'as-needed'],
      'object-curly-newline': [
        'warn',
        {
          consistent: true,
        },
      ],
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['warn', 'always', { arraysInObjects: false }],
      'array-bracket-spacing': ['warn', 'never', { objectsInArrays: true }],
      'brace-style': ['warn', 'stroustrup', { allowSingleLine: false }],
      'no-extra-boolean-cast': 'off',
      'no-undef': 'off',
      'no-unused-vars': [
        'warn',
        {
          args: 'all',
        },
      ],
      'block-spacing': ['error', 'never'],
      'no-debugger': 'warn',
      quotes: ['error', 'single'],
      indent: ['warn', 2, { MemberExpression: 1 }],
      'comma-dangle': ['error', 'always-multiline'],
      semi: ['error', 'always'],
      'no-multiple-empty-lines': [
        'error',
        {
          max: 1,
        },
      ],
      'no-multi-spaces': [
        'error',
        {
          exceptions: {
            VariableDeclarator: true,
            ImportDeclaration: true,
          },
        },
      ],
      'no-irregular-whitespace': 'warn',
      // Event listener invoker on one line; multiple args may be on multiple lines
      'function-call-argument-newline': ['warn', 'consistent'],
      'function-paren-newline': ['warn', 'multiline-arguments'],
      // Spreads / array elements optional on one or multiple lines
      'array-element-newline': ['warn', 'consistent'],
      'array-bracket-newline': ['warn', 'consistent'],
    },
  },
  {
    files: ['*.json'],
    languageOptions: {
      parser: jsoncParser,
    },
    plugins: {
      json: jsonPlugin,
    },
    rules: {
      'json/*': ['error'],
    },
  },
  // Avoid config file linting itself with formatting rules
  {
    files: ['eslint.config.mjs'],
    rules: {
      'array-bracket-spacing': 'off',
      'object-property-newline': 'off',
    },
  },
];
