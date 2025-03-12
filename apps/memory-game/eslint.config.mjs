import baseConfig, { restrictEnvAccess } from "@workshop/eslint-config/base";
import reactConfig from "@workshop/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".next/**"],
  },
  ...baseConfig,
  ...reactConfig,
  ...restrictEnvAccess,
];
