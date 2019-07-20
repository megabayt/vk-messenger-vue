module.exports = {
  parser: "vue-eslint-parser",  // Specifies the ESLint parser
  extends: [
    "plugin:vue/essential",
    "plugin:@typescript-eslint/recommended",
    "airbnb-base"
  ],
  parserOptions: {
    ecmaVersion: 2018,  // Allows for the parsing of modern ECMAScript features
    sourceType: "module",  // Allows for the use of imports
    "parser": "@typescript-eslint/parser",
  },
  env: {
    browser: true,
    es6: true
  },
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  plugins: [
    "sort-keys-fix",
    "vue"
  ],
  rules: {
    quotes: ["error", "single", { "allowTemplateLiterals": true }],
    "no-irregular-whitespace": "error",
    "key-spacing": "error",
    "sort-keys-fix/sort-keys-fix": "error",
    "max-len": ["error", { "code": 140, "tabWidth": 2 }],
    camelcase: "error",
    "no-var": "error",
    "no-param-reassign": "error",
    "prefer-const": "error",
    "import/no-extraneous-dependencies": "off",
    "import/no-unresolved": "off",

    "@typescript-eslint/indent": ["error", 2],
    "@typescript-eslint/array-type": ["error", "generic"],
    "@typescript-eslint/interface-name-prefix": ["error", "always"],

  }
};