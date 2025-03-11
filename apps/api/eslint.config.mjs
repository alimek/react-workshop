import baseConfig, { restrictEnvAccess } from "@workshop/eslint-config/base";
import nextjsConfig from "@workshop/eslint-config/nextjs";
import reactConfig from "@workshop/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".next/**"],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...restrictEnvAccess,
];
