module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "jest/globals": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react", "jest"
    ],
    "rules": {
        "indent": [
            1,
            4
        ],
        "quotes": [
            1,
            "single"
        ],
        "semi": [
            1,
            "never"
        ],
        "comma-dangle": [
            1,
            "always-multiline"
        ],
        "eqeqeq": 1,
        "no-trailing-spaces": 1,
        "object-curly-spacing": [
            1, "always"
        ],
        "arrow-spacing": [
            1, { "before": true, "after": true }
        ],
        "no-console": 0,
        "react/prop-types": 0
    },
    "settings": {
        "react": {
            "version": "detect"
        }
    }
}