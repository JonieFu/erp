module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'space-before-function-paren': 0,
    "eol-last": 0,
    "comma-dangle": ["error", {
      "arrays": "never",
      "objects": "never",
      "imports": "never",
      "exports": "never",
      "functions": "ignore"
    }],
    "no-useless-return": 0
  }
}
