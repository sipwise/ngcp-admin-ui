import importPlugin from 'eslint-plugin-import'
import jest from 'eslint-plugin-jest'
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths'
import unusedImports from 'eslint-plugin-unused-imports'
import vue from 'eslint-plugin-vue'
import globals from 'globals'
import neostandard, { plugins } from 'neostandard'

export default [
    {
        ignores: [
            'debian',
            'src-bex/www',
            'src-capacitor',
            'src-cordova',
            'node_modules',
            'dist',
            '**/.*'
        ]
    },
    // replaces `...compat.extends('standard')` — ESLint-9-native successor
    ...neostandard(),
    ...vue.configs['flat/recommended'],
    {
        plugins: {
            '@stylistic': plugins['@stylistic'],
            vue,
            jest,
            'unused-imports': unusedImports,
            'no-relative-import-paths': noRelativeImportPaths,
            import: importPlugin
        },
        languageOptions: {
            globals: {
                ...globals.browser,
                ...jest.environments.globals.globals,
                ga: true,
                cordova: true,
                __statics: true,
                process: true,
                Capacitor: true,
                chrome: true,
                jest: true
            },
            sourceType: 'module'
        },
        rules: {
            '@stylistic/arrow-parens': 'error',
            '@stylistic/arrow-spacing': 'error',
            '@stylistic/brace-style': 'error',
            '@stylistic/indent': ['error', 4],
            '@stylistic/newline-per-chained-call': 'off',
            '@stylistic/nonblock-statement-body-position': ['error', 'below'],
            '@stylistic/object-curly-newline': [
                'error',
                { ImportDeclaration: { multiline: true, minProperties: 4 } }
            ],
            '@stylistic/object-curly-spacing': ['error', 'always'],
            'default-param-last': 'error',
            eqeqeq: ['error', 'always'],
            'import/default': 'error',
            'import/extensions': 'error',
            'import/first': 'off',
            'import/named': 'error',
            'import/namespace': 'error',
            'import/no-extraneous-dependencies': 'off',
            'import/no-unresolved': 'off',
            'import/order': [
                'error',
                {
                    groups: ['builtin', 'external', 'internal', 'sibling', 'parent', 'index'],
                    named: true,
                    alphabetize: { order: 'asc', caseInsensitive: false, orderImportKind: 'asc' }
                }
            ],
            'import/prefer-default-export': [0],
            'multiline-ternary': 'off',
            'no-console': 'error',
            'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
            'no-duplicate-imports': 'error',
            'no-else-return': ['error', { allowElseIf: true }],
            'no-multi-assign': 'error',
            'no-nested-ternary': 'error',
            'no-param-reassign': 'error',
            'no-relative-import-paths/no-relative-import-paths': ['error'],
            'no-var': 'error',
            'object-shorthand': 'error',
            'prefer-const': 'error',
            'prefer-object-spread': 'error',
            'prefer-template': 'error',
            'unused-imports/no-unused-imports': 'error',
            'vue/html-indent': ['error', 4]
        }
    }
]
