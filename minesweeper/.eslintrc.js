module.exports = {
  env: {
    browser: true,
  },
  extends: [
    'eslint-config-airbnb-base',
  ],
  rules: {
    'import/extensions': 'off',
  },
  parserOptions: {
    ecmaVersion: 13,
  },
};
