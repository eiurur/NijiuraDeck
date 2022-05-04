module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', '@vue/airbnb'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'arrow-body-style': 0,
    'array-callback-return': 0,
    'arrow-parens': 0,
    'comma-dangle': 0,
    'consistent-return': 0,
    'eol-last': 0,
    'import/no-useless-path-segments': 0,
    'linebreak-style': 0,
    'max-len': 0,
    'no-shadow': 0,
    'no-param-reassign': 0,
    'no-await-in-loop': 0,
    'no-restricted-syntax': 0,
    quotes: 0,
    'operator-linebreak': 0,
  },
};
