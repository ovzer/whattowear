module.exports =  {
    "extends": [
      "react-app",
      "plugin:import/errors",
      "plugin:import/warnings",
      "plugin:import/typescript"
    ],
    "overrides": [
      {
        "files": [
          "**/*.tsx",
          "**/*.ts"
        ],
        "extends": [
          "react-app",
          "plugin:import/warnings",
          "plugin:import/typescript"
        ],
        "parser": "@typescript-eslint/parser",
        "parserOptions": {
          "ecmaVersion": 2018,
          "sourceType": "module",
          "ecmaFeatures": {
            "jsx": true
          },
          "project": "./tsconfig.json",
          "warnOnUnsupportedTypeScriptVersion": true
        },
        "plugins": [
          "@typescript-eslint"
        ],
        "rules": {
          "@typescript-eslint/array-type": "warn",
          "@typescript-eslint/consistent-type-definitions": [
            "error",
            "interface"
          ],
          "default-param-last": "off",
          "@typescript-eslint/default-param-last": "warn",
          "@typescript-eslint/explicit-member-accessibility": "error",
          "@typescript-eslint/func-call-spacing": "warn",
          "indent": "off",
          "@typescript-eslint/indent": [
            "warn",
            2
          ],
          "@typescript-eslint/member-delimiter-style": "warn",
          "@typescript-eslint/naming-convention": [
            "warn",
            {
              "selector": "interface",
              "format": [
                "PascalCase"
              ],
              "prefix": [
                "I"
              ]
            }
          ],
          "no-extra-semi": "off",
          "@typescript-eslint/no-extra-semi": "warn",
          "no-use-before-define": "off",
          "@typescript-eslint/no-use-before-define": "warn",
          "@typescript-eslint/prefer-for-of": "warn",
          "@typescript-eslint/prefer-includes": "error",
          "@typescript-eslint/prefer-string-starts-ends-with": "warn",
          "quotes": "off",
          "@typescript-eslint/quotes": [
            "warn",
            "single"
          ],
          "semi": "off",
          "@typescript-eslint/semi": [
            "warn",
            "always"
          ],
          "space-before-function-paren": "off",
          "@typescript-eslint/space-before-function-paren": [
            "warn",
            "never"
          ],
          "@typescript-eslint/type-annotation-spacing": "warn"
        }
      }
    ],
    "rules": {
      "array-bracket-spacing": [
        "warn",
        "never"
      ],
      "arrow-parens": "warn",
      "arrow-spacing": "warn",
      "camelcase": "warn",
      "comma-dangle": [
        "warn",
        "always-multiline"
      ],
      "comma-spacing": "warn",
      "default-param-last": "warn",
      "eol-last": "warn",
      "import/first": "warn",
      "import/newline-after-import": "warn",
      "import/no-commonjs": "warn",
      "import/no-cycle": "warn",
      "import/no-default-export": "warn",
      "import/no-duplicates": "warn",
      "import/no-unassigned-import": [
        "warn",
        {
          "allow": [
            "**/*.css",
            "**/*.scss",
            "**/*.sass"
          ]
        }
      ],
      "import/no-unused-modules": "warn",
      "import/order": [
        "warn",
        {
          "groups": [
            [
              "builtin",
              "external"
            ],
            [
              "index",
              "internal",
              "parent",
              "sibling"
            ]
          ],
          "newlines-between": "always"
        }
      ],
      "indent": [
        "warn",
        2
      ],
      "jsx-quotes": [
        "warn",
        "prefer-double"
      ],
      "keyword-spacing": "warn",
      "linebreak-style": [
        "error",
        "unix"
      ],
      "max-len": [
        "warn",
        120
      ],
      "multiline-ternary": [
        "warn",
        "always-multiline"
      ],
      "no-extra-semi": "warn",
      "no-lonely-if": "warn",
      "no-multi-spaces": "warn",
      "no-multiple-empty-lines": [
        "warn",
        {
          "max": 1
        }
      ],
      "no-tabs": "warn",
      "no-trailing-spaces": "warn",
      "no-unneeded-ternary": "warn",
      "no-unused-expressions": "warn",
      "no-use-before-define": "warn",
      "no-var": "error",
      "object-curly-newline": [
        "warn",
        {
          "multiline": true
        }
      ],
      "object-curly-spacing": [
        "warn",
        "always"
      ],
      "object-shorthand": "warn",
      "operator-linebreak": "warn",
      "one-var-declaration-per-line": "warn",
      "prefer-arrow-callback": "warn",
      "prefer-const": "warn",
      "prefer-destructuring": "warn",
      "prefer-rest-params": "warn",
      "prefer-spread": "warn",
      "prefer-template": "warn",
      "quotes": [
        "warn",
        "single"
      ],
      "react/jsx-closing-bracket-location": "warn",
      "react/jsx-closing-tag-location": "warn",
      "react/jsx-curly-brace-presence": [
        "warn",
        "never"
      ],
      "react/jsx-first-prop-new-line": [
        "warn",
        "multiline"
      ],
      "react/jsx-tag-spacing": [
        "warn",
        {
          "beforeClosing": "never"
        }
      ],
      "react/jsx-wrap-multilines": [
        "warn",
        {
          "declaration": "parens-new-line",
          "assignment": "parens-new-line",
          "return": "parens-new-line",
          "arrow": "parens-new-line",
          "condition": "parens-new-line",
          "logical": "parens-new-line",
          "prop": "parens-new-line"
        }
      ],
      "rest-spread-spacing": "warn",
      "semi": [
        "warn",
        "always"
      ],
      "semi-style": [
        "warn",
        "last"
      ],
      "space-before-blocks": "warn",
      "space-before-function-paren": [
        "warn",
        "never"
      ],
      "space-in-parens": "warn",
      "space-infix-ops": "warn",
      "space-unary-ops": "warn",
      "template-curly-spacing": "warn"
    }
}