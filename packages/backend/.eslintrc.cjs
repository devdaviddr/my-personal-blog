module.exports = {
  root: true,
  extends: [
    '../../.eslintrc.js',
  ],
  env: { node: true, es2020: true },
  ignorePatterns: ['dist', '.eslintrc.cjs'],
}