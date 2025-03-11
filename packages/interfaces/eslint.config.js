import baseConfig, { restrictEnvAccess } from "@workshop/eslint-config/base";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".next/**"],
  },
  ...baseConfig,
  ...restrictEnvAccess,
];
