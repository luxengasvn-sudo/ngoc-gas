import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

const nextConfigWithOverrides = nextVitals.map(config => {
  if (config.plugins && config.plugins['react-hooks']) {
    return {
      ...config,
      rules: {
        ...config.rules,
        "react/no-unescaped-entities": "off",
        "react-hooks/set-state-in-effect": "warn",
        "react-hooks/preserve-manual-memoization": "warn",
        "react-hooks/purity": "warn",
        "@next/next/no-img-element": "warn"
      }
    };
  }
  return config;
});

const eslintConfig = defineConfig([
  ...nextConfigWithOverrides,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "scripts/**"
  ]),
]);

export default eslintConfig;
