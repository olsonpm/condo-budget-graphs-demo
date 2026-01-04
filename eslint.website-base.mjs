import path from 'node:path'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { createNodeResolver } from 'eslint-plugin-import-x'

const { dirname } = import.meta
const fromRoot = fpath => path.resolve(dirname, fpath)

const reactCfg = react.configs.flat

const reactHooksCompatCfg = {
  plugins: {
    'react-hooks': reactHooks,
  },
  rules: reactHooks.configs.recommended.rules,
}

const reactRefreshCompatCfg = {
  plugins: {
    'react-refresh': reactRefresh,
  },
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}

export default [
  {
    settings: {
      react: { version: 'detect' },
      'import-x/resolver-next': [
        createNodeResolver({
          alias: {
            '@/*': [`${fromRoot('src/frontend')}/*`],
            '@data/*': [`${fromRoot('data/app-ready')}/*`],
            '@shared': [fromRoot('shared/index.mjs')],
          },
          extensions: ['.mjs', '.js', '.json', '.jsx'],
        }),
      ],
    },
  },
  reactCfg.recommended,
  reactCfg['jsx-runtime'],
  reactHooksCompatCfg,
  reactRefreshCompatCfg,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'react/jsx-no-target-blank': 'off',
      'react/prop-types': 'off',
    },
  },
  { ignores: ['dist/*', 'container/*'] },
]
