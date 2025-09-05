import js from "@eslint/js";
import pluginCypress from "eslint-plugin-cypress";
import { defineConfig } from "eslint/config";

export default defineConfig([
  js.configs.recommended,
  {
    files: ["cypress/**/*.js", "cypress/**/*.cy.js", "cypress/**/*.spec.js"],
    plugins: { cypress: pluginCypress },
    ...pluginCypress.configs.recommended,
    rules: {
      indent: ["error", 2],
    },
  },
]);
