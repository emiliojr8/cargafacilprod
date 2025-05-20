// eslint.config.mjs

import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  {
    ignores: ["eslint.config.mjs"]
  },
  {
    files: ["**/*.{js,cjs,mjs,ts,jsx,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node
      },
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: process.cwd()
      }
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      react: pluginReact
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...tseslint.configs.recommendedTypeChecked[0].rules,
      ...pluginReact.configs.flat.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "@typescript-eslint/no-unused-vars": "warn"
    }
  }
];
