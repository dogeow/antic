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
    "plugin:@typescript-eslint/recommended",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["react", "prettier", "simple-import-sort", "react-hooks", "@typescript-eslint"],
  rules: {
    camelcase: "off",
    "prettier/prettier": ["error", { printWidth: 120 }],
    "require-jsdoc": 0,
    "no-unused-vars": 0,
    "no-invalid-this": 0,
    "react/prop-types": 0,
    "react/display-name": 0,
    "simple-import-sort/imports": "error",
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": [
      "warn",
      {
        additionalHooks: "useRecoilCallback",
      },
    ],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
