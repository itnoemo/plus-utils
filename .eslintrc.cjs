module.exports = {
  env: {
    browser: true,
    node: true,
  },
  globals: {

  },
  extends: [
    'eslint:recommended', // eslint的建议规则，参考：https://eslint.bootcss.com/docs/rules/
    // eslint-config-prettier, 关闭一些与 Prettier 冲突的 ESLint 规则。
    // 覆盖eslint格式配置, 需要写在extends最后面
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    parser: 'babel-eslint'
  },

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'prettier/prettier': 'error',
    'no-unused-vars': 'off'
  },
};
