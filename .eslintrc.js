module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "plugin:react/recommended",
        "standard-with-typescript",
        "plugin:import/typescript",
        "plugin:prettier/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project": "./tsconfig.json"
    },
    "plugins": [
        "react", "prettier"
    ],
    "rules": {
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/strict-boolean-expressions": "off",
        "@typescript-eslint/no-misused-promises": [2, {
            "checksVoidReturn": {
              "attributes": false
            }
          }],
        "react/prop-types": "off",
    }
}
