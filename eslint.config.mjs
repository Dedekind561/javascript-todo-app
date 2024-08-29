import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  { languageOptions: { globals: globals.jest } },
  pluginJs.configs.recommended,
];