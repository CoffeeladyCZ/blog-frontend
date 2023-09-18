module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:react/jsx-runtime',
    'plugin:i18next/recommended'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'react', 'i18next'],
  rules: {
    indent: ['warn', 2, { SwitchCase: 1 }],
    'no-trailing-spaces': ['warn'],
    'no-var': ['warn'],
    'prefer-const': ['warn', { ignoreReadBeforeAssign: true }],
    'no-return-assign': ['error', 'always'],
    'i18next/no-literal-string': 2
  },
  settings: {
    'i18next/languages': ['en', 'cz']
  }
};
