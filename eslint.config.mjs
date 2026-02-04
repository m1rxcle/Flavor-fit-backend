// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';

export default tseslint.config(
    {
        ignores: ['eslint.config.mjs'],
    },
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    eslintPluginPrettierRecommended,
    {
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.jest,
            },
            sourceType: 'commonjs',
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    {
        plugins: {
            import: importPlugin,
        },
        settings: {
            'import/internal-regex': '^(src|prisma/generated/)',
        },

        rules: {
            '@typescript-eslint/no-require-imports': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-unsafe-call': 'off',
            '@typescript-eslint/require-await': 'off',
            '@typescript-eslint/no-floating-promises': 'off',
            '@typescript-eslint/no-unused-vars': 'warn',
            '@typescript-eslint/no-unsafe-argument': 'warn',
            'prettier/prettier': ['warn', { endOfLine: 'auto' }],

            'import/order': [
                'warn',
                {
                    groups: [
                        'builtin', // fs, path
                        'external', // @nestjs/*, prisma, class-validator
                        'internal', // src/*
                        'parent', // ../
                        'sibling', // ./
                        'index', // ./index
                        'object',
                        'type',
                    ],
                    pathGroups: [
                        {
                            pattern: 'prisma/generated/**',
                            group: 'internal',
                            position: 'after',
                        },
                        {
                            pattern: 'src/**',
                            group: 'internal',
                            position: 'after',
                        },
                    ],
                    pathGroupsExcludedImportTypes: ['builtin', 'external'],
                    'newlines-between': 'always',
                    alphabetize: { order: 'asc', caseInsensitive: true },
                },
            ],
        },
    },
);
