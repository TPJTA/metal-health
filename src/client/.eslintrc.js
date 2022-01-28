const isProd = process.env.NODE_ENV === "production"
module.exports = {
  parserOptions: {
    project: isProd ? './tsconfig.json' : 'src/client/tsconfig.json',
    sourceType: 'module',
  },
  extends: [
    "next/core-web-vitals",
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['.eslintrc.js'],
};