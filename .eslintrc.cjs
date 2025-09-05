module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  rules: {
    'complexity': ['warn', 10],
    'max-depth': ['warn', 3],
    'max-lines-per-function': ['warn', 50],
    'no-console': 'warn',
    'import/no-cycle': 'warn'
  }
};