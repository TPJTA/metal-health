module.exports = {
  parserOptions: {
    project: 'src/client/tsconfig.json',
    sourceType: 'module',
  },
  extends: [
    "next/core-web-vitals",
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['.eslintrc.js'],
};