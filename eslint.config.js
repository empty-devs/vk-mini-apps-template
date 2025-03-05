import tsEslintPlugin from '@typescript-eslint/eslint-plugin';
import tsEslintParser from '@typescript-eslint/parser';
import { fixupPluginRules } from '@eslint/compat';
import eslintReactPlugin from 'eslint-plugin-react';
import eslintHooksPlugin from 'eslint-plugin-react-hooks';
import eslintImportPlugin from 'eslint-plugin-import';
import eslintRefreshPlugin from 'eslint-plugin-react-refresh';
import eslintPrettierPlugin from 'eslint-plugin-prettier';

export default [
    {
        files: ['**/*.{ts,tsx}'],
        ignores: ['node_modules', '**/dist/**/*', '**/dist-ssr/**/*', 'vite.config.ts', 'vite.config.odr.ts'],
        plugins: {
            react: eslintReactPlugin,
            prettier: eslintPrettierPlugin,
            '@typescript-eslint': tsEslintPlugin,
            'react-hooks': fixupPluginRules(eslintHooksPlugin),
            'react-refresh': eslintRefreshPlugin,
            import: eslintImportPlugin
        },
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parser: tsEslintParser,
            parserOptions: {
                project: 'tsconfig.json',
                ecmaFeatures: {
                    jsx: true
                }
            }
        },
        settings: {
            react: {
                version: 'detect'
            },
            'import/resolver': {
                node: {
                    extensions: ['.ts', '.tsx']
                }
            }
        },
        rules: {
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/no-non-null-assertion': 'warn',
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_'
                }
            ],
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
            'react-refresh/only-export-components': 'warn',
            semi: ['error', 'always'],
            quotes: ['error', 'single'],
            'jsx-quotes': ['error', 'prefer-double'],
            'prefer-const': 'error',
            'no-var': 'error',
            'prefer-arrow-callback': 'error',
            'no-duplicate-imports': 'error',
            'no-console': 'error',
            'object-curly-spacing': ['error', 'always'],
            'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 0 }],
            'comma-dangle': ['error', 'never'],
            'react/jsx-closing-bracket-location': [2, 'tag-aligned'],
            'react/jsx-curly-spacing': ['error', { when: 'never', children: true }],
            'react/jsx-indent': ['error', 4],
            'react/jsx-indent-props': ['error', 4],
            'react/no-access-state-in-setstate': ['error'],
            'react/no-array-index-key': ['error'],
            'react/no-direct-mutation-state': ['error'],
            'react/jsx-no-bind': [
                'error',
                {
                    ignoreDOMComponents: false,
                    ignoreRefs: false,
                    allowArrowFunctions: true,
                    allowFunctions: false,
                    allowBind: false
                }
            ],
            'react/jsx-no-target-blank': [
                'error',
                {
                    allowReferrer: false,
                    enforceDynamicLinks: 'always',
                    warnOnSpreadAttributes: true,
                    links: true,
                    forms: true
                }
            ],
            '@typescript-eslint/ban-ts-comment': 'error',
            '@typescript-eslint/explicit-module-boundary-types': 'error',
            '@typescript-eslint/no-inferrable-types': 'error',
            'prettier/prettier': 'error'
        }
    }
];
