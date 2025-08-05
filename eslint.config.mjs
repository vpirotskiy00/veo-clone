// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tailwindcss from 'eslint-plugin-tailwindcss';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import security from 'eslint-plugin-security';
import reactHooks from 'eslint-plugin-react-hooks';
import reactPerf from 'eslint-plugin-react-perf';
import importPlugin from 'eslint-plugin-import';
import sonarjs from 'eslint-plugin-sonarjs';
import promise from 'eslint-plugin-promise';
import unicorn from 'eslint-plugin-unicorn';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  ...storybook.configs['flat/recommended'],
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      'simple-import-sort': simpleImportSort,
      tailwindcss: tailwindcss,
      'jsx-a11y': jsxA11y,
      '@typescript-eslint': typescriptEslint,
      security: security,
      'react-hooks': reactHooks,
      'react-perf': reactPerf,
      import: importPlugin,
      sonarjs: sonarjs,
      promise: promise,
      unicorn: unicorn,
    },
    rules: {
      // TypeScript strict rules
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-floating-promises': 'off', // Requires type checking

      // Import sorting
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'import/no-duplicates': 'error',

      // Tailwind CSS - Disabled for v4 compatibility issues
      // Beta version has issues resolving Tailwind CSS v4
      // 'tailwindcss/classnames-order': 'warn',
      // 'tailwindcss/no-contradicting-classname': 'error',
      // 'tailwindcss/no-unnecessary-arbitrary-value': 'warn',

      // Accessibility
      ...jsxA11y.configs.recommended.rules,
      'jsx-a11y/anchor-is-valid': [
        'error',
        {
          components: ['Link'],
          specialLink: ['hrefLeft', 'hrefRight'],
          aspects: ['invalidHref', 'preferButton'],
        },
      ],
      // Disable for base UI components that will receive content from parent
      'jsx-a11y/heading-has-content': ['error', { components: [] }],
      'jsx-a11y/label-has-associated-control': [
        'error',
        {
          assert: 'either',
          depth: 3,
        },
      ],

      // Security rules
      ...security.configs.recommended.rules,
      'security/detect-object-injection': 'warn', // Too strict for normal object access
      'security/detect-non-literal-fs-filename': 'warn', // Allow dynamic file paths with warning

      // React Hooks rules
      ...reactHooks.configs.recommended.rules,
      'react-hooks/exhaustive-deps': 'error',

      // React Performance rules
      'react-perf/jsx-no-new-object-as-prop': 'warn',
      'react-perf/jsx-no-new-array-as-prop': 'warn',
      'react-perf/jsx-no-new-function-as-prop': 'warn',
      'react-perf/jsx-no-jsx-as-prop': 'warn',

      // Import rules
      'import/no-extraneous-dependencies': ['error', {
        devDependencies: [
          '**/*.test.{js,jsx,ts,tsx}',
          '**/*.spec.{js,jsx,ts,tsx}',
          '**/*.stories.{js,jsx,ts,tsx}',
          '**/vitest.config.{js,ts}',
          '**/next.config.{js,ts}',
          '**/tailwind.config.{js,ts}',
          '**/postcss.config.{js,mjs}',
          '**/.storybook/**/*',
        ],
      }],
      'import/no-self-import': 'error',
      'import/no-cycle': 'error',
      'import/no-useless-path-segments': 'error',
      'import/no-absolute-path': 'error',

      // SonarJS code quality rules
      'sonarjs/cognitive-complexity': ['error', 15],
      'sonarjs/no-duplicate-string': ['error', { threshold: 5 }],
      'sonarjs/no-duplicated-branches': 'error',
      'sonarjs/no-identical-functions': 'error',
      'sonarjs/no-small-switch': 'error',
      'sonarjs/prefer-immediate-return': 'error',
      'sonarjs/prefer-single-boolean-return': 'error',
      'sonarjs/no-unused-collection': 'error',
      'sonarjs/no-nested-template-literals': 'warn',
      'sonarjs/no-redundant-boolean': 'error',

      // Promise rules for async/await
      'promise/always-return': 'off', // Too strict for React components
      'promise/no-return-wrap': 'error',
      'promise/param-names': 'error',
      'promise/catch-or-return': ['error', { allowFinally: true }],
      'promise/no-callback-in-promise': 'warn',
      'promise/no-promise-in-callback': 'warn',
      'promise/no-nesting': 'warn',
      'promise/valid-params': 'error',
      'promise/prefer-await-to-then': 'error',
      'promise/prefer-await-to-callbacks': 'error',

      // Unicorn modern practices (selective rules)
      'unicorn/better-regex': 'error',
      'unicorn/prefer-includes': 'error',
      'unicorn/prefer-string-starts-ends-with': 'error',
      'unicorn/prefer-array-some': 'error',
      'unicorn/prefer-array-find': 'error',
      'unicorn/prefer-ternary': 'warn',
      'unicorn/no-array-for-each': 'off', // Allow forEach in React
      'unicorn/no-null': 'off', // Allow null for React refs
      'unicorn/prevent-abbreviations': 'off', // Too aggressive for Next.js
      'unicorn/filename-case': 'off', // Next.js uses mixed case
      'unicorn/prefer-module': 'off', // Next.js uses CommonJS in config
      'unicorn/prefer-node-protocol': 'error',
      'unicorn/no-console-spaces': 'error',
      'unicorn/error-message': 'error',
      'unicorn/throw-new-error': 'error',

      // General code quality
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'error',
      'no-var': 'error',
      'no-debugger': 'error',
    },
    settings: {
      tailwindcss: {
        callees: ['cn', 'clsx', 'cva'],
        config: 'tailwind.config.js', // Points to compatibility config file
      },
    },
  },
  {
    files: ['**/*.stories.{js,jsx,ts,tsx}'],
    rules: {
      'import/no-anonymous-default-export': 'off',
    },
  },
  {
    // Disable certain rules for UI components library
    files: ['components/ui/**/*.tsx'],
    rules: {
      'jsx-a11y/heading-has-content': 'off',
      'jsx-a11y/label-has-associated-control': 'off',
    },
  },
];

export default eslintConfig;
