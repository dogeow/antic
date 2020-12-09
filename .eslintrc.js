module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    "plugin:react/recommended",
    "google",
    "prettier",
    "prettier/react",
    "plugin:prettier/recommended",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["react", "prettier", "simple-import-sort"],
  rules: {
    "prettier/prettier": "error",
    "require-jsdoc": 0,
    "react/prop-types": 0,
    "simple-import-sort/imports": "error",
  },
};
