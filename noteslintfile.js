module.exports = {
    env: {
        browser: true,
        jest: true
    },
    parser: "babel-eslint",
    extends: [
        'airbnb'
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
        "__CLIENT__": true,
        "__SERVER__": true,
        "__DEV__": true
    },
    parserOptions: {
        sourceType: "module",
        allowImportExportEverywhere: false,
        ecmaFeatures: {
            globalReturn: false,
        },
        babelOptions: {
            configFile: "babel.config.js",
        },
    },
    plugins: [
        'react',
        'only-warn',
        'prettier',
        "justinanastos"
    ],
    rules: {
        "import/prefer-default-export": 0,
        "react/jsx-closing-bracket-location": 0,
        "react/jsx-one-expression-per-line": 0,
        "react/jsx-filename-extension": 0,
        "react/jsx-uses-react": 1,
        "react/destructuring-assignment": 0,
        "react/require-default-props": 0,
        "react/forbid-prop-types": 0,
        "react/prop-types": 0,
        "no-console": [1, { allow: ["warn", "error"] }],
        'max-len': [1, { "code": 120 }],
        "object-curly-newline": 0,
        "no-underscore-dangle": 0,
        "no-use-before-define": 0,
        "no-else-return": 0,
        "global-require": 0,
        "comma-dangle": [1, "always-multiline"],
        "func-names": 0,
        "quotes": [1, "single", {"avoidEscape": true , "allowTemplateLiterals": true}],
        "jsx-quotes": [1, "prefer-single"],
        "semi": 1,
        "operator-linebreak": 0,
        "import/order": ["error", {"groups": ["builtin", "external", "internal", "parent", "sibling", "index"]}],
        "indent": ["warn", 4, { "SwitchCase": 1 }],
        "react/jsx-indent": ["warn", 4],
        'react/jsx-indent-props': ['warn', 4],
        "padded-blocks": 0,
        "camelcase": 0,
        "max-classes-per-file": 0,
        "react/prefer-stateless-function": 0,
        "jsx-a11y/click-events-have-key-events": 0,
        "jsx-a11y/no-noninteractive-element-interactions": 0,
        "jsx-a11y/no-static-element-interactions": 0,
        "no-shadow": 0,
        "react/no-access-state-in-setstate": 0,
        "no-tabs": 1,
        "no-case-declarations": 0,
        "no-lonely-if": 0,
        "no-mixed-operators": 0,
        "no-param-reassign": 0,
        "no-restricted-syntax": 0,
        "guard-for-in": 0,
        "react/jsx-props-no-spreading": 0,
        "import/extensions": 0,
        "react/no-array-index-key": 0,
        "consistent-return": 0,
        "import/no-named-as-default": 0,
        "import/no-dynamic-require": 0,
        "no-prototype-builtins": 0,
        "import/no-extraneous-dependencies": 0,
        "no-return-assign": 0,
        "no-plusplus": 0,
        "jsx-a11y/label-has-associated-control": 0,
        "react/no-string-refs": 0,
        "arrow-parens": ["warn", "as-needed"],
        "one-var": 0,
        "one-var-declaration-per-line": 0,
        "no-unused-expressions": 0,
        "keyword-spacing": [
            1,
            {
                "overrides": {
                    "if": { "after": false },
                    "for": { "after": false },
                    "while": { "after": false },
                    "catch": { "after": false },
                    "do": { "after": false },
                    "switch": { "after": false},
                    "function": { "after": false },
                    "catch": { "after": true }
                }
            }
        ],
        "justinanastos/alpha-object-expression": 0,
        "justinanastos/chained-semi": 0,
        "justinanastos/func-arg-line-breaks": 0,
        "justinanastos/import-destructuring-spacing": [1, "multiline", 4],
        "justinanastos/shortcuts": 0,
        "justinanastos/switch-braces": 1,
        "no-floating-decimal": 0
    },
    "overrides": [
        {
            "files": ["*.test.js"],
            "rules": {
                "no-unused-expressions": "off",
                "no-unused-vars": "off"
            }
        }
    ],
    "settings": {
        "import/resolver": {
            "node": {
                "moduleDirectory": ["node_modules", "src"]
            }
        }
    }
};
