import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // Catch unused variables, but allow _ prefix for intentionally unused
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],

      // Prevent console.log in production (allow warn/error for legitimate use)
      "no-console": ["warn", { allow: ["warn", "error"] }],

      // Prevent debugger statements
      "no-debugger": "error",

      // Enforce type-safe equality
      eqeqeq: ["error", "always", { null: "ignore" }],

      // Prevent explicit any (warn to start, can escalate to error later)
      "@typescript-eslint/no-explicit-any": "warn",
    },
  }
);
