module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    semi: 2,
    quotes: ["error", "double"],
    indent: ["error", 2],
    "no-var": 2,
    "no-useless-constructor": 2,
    "no-duplicate-imports": 2,
    "eol-last": ["error", "always"],
    "object-curly-spacing": ["error", "always"],
    "array-bracket-spacing": ["error", "never"],
    "computed-property-spacing": ["error", "never"],
    "sort-imports": ["warn", {
      "ignoreCase": false,
      "ignoreDeclarationSort": false,
      "ignoreMemberSort": false,
      "memberSyntaxSortOrder": ["none", "all", "multiple", "single"]
    }],
    "prefer-const": 2,
    "no-const-assign": 2,
    "no-confusing-arrow": 1,
    "semi-spacing": ["error", {
      "before": false,
      "after": true
    }],
    "no-whitespace-before-property": 2,
    "no-underscore-dangle": ["error", {
      allow: [],
      allowAfterThis: true,
      allowAfterSuper: false,
      enforceInMethodNames: false
    }],
    "no-trailing-spaces": 2,
    "camelcase": ["error", {
      properties: "always"
    }]
  }
};
