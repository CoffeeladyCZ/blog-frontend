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
    'plugin:react/jsx-runtime'
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
  plugins: ['@typescript-eslint', 'react'],
  rules: {
    // Basic settings
    indent: ['warn', 2, { SwitchCase: 1 }],
    'no-trailing-spaces': ['warn'],

    // Code settings
    'no-var': ['warn'],
    'prefer-const': ['warn', { ignoreReadBeforeAssign: true }],
    'no-return-assign': ['error', 'always']
  }
};
