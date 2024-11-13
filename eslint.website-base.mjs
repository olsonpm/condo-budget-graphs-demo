import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

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
  { settings: { react: { version: 'detect' } } },
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
