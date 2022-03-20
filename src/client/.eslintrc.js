const isProd = process.env.NODE_ENV === "production"
module.exports = {
  parserOptions: {
    project: isProd ? './tsconfig.json' : 'src/client/tsconfig.json',
    sourceType: 'module',
  },
  extends: [
    "next/core-web-vitals",
    "plugin:react/recommended",
    'plugin:prettier/recommended',
  ],
  rules: {
    "react/self-closing-comp": "error"
  },
  ignorePatterns: ['.eslintrc.js'],
};