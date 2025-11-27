import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginJest from "eslint-plugin-jest";

export default [
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginJest.configs["flat/recommended"],
  {
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"],
    languageOptions: {
      globals: globals.browser,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      semi: ["error", "always"],
      quotes: ["error", "single"],
      indent: ["error", 2],
      "comma-dangle": ["error", "always-multiline"],
      "object-curly-spacing": ["error", "always"],
      "no-console": ["warn"],
      "react/jsx-indent": ["error", 2],
      "react/jsx-indent-props": ["error", 2],
      "no-undef": ["error"],
      "consistent-return": ["error"],
      "prefer-const": ["error"],
      "no-var": ["error"],
      "object-shorthand": ["error", "always"],
      "arrow-body-style": ["error", "as-needed"],
      "no-trailing-spaces": ["error"],
      "eol-last": ["error", "always"],
      "brace-style": ["error", "1tbs", { allowSingleLine: true }],
      "max-len": ["error", { code: 80, ignoreComments: true }],
      "no-restricted-syntax": ["error", "WithStatement"],
      "no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },
];
