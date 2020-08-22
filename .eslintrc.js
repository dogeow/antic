module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    extends: [
        'airbnb',
        'plugin:react/recommended',
        "prettier",
        "prettier/react",
        "plugin:prettier/recommended"
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parser: "babel-eslint",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: [
        'react', 'prettier', 'simple-import-sort'
    ],
    rules: {
        'prettier/prettier': 'error',
        'react/display-name': 'off',
        'react/prop-types': 'off',
        "simple-import-sort/sort": "error"
    },
};
