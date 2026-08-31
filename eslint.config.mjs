import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),

  /**
   * THE 3D SCENES ARE VERBATIM PORTS, and that is the whole point of them.
   *
   * `src/components/twin/scenes/*.ts` are the owner's original scene builders
   * carried across byte-for-byte from `1_CRA_web_sources/3D PLC Design
   * Review/*.html`. Their fidelity was checked by diffing them against those
   * originals — when the models rendered badly, that diff is what proved the
   * geometry was innocent and the renderer was at fault.
   *
   * They are plain JavaScript written against a `THREE` handle passed in at
   * runtime, so they carry `@ts-nocheck`, which `ban-ts-comment` rejects.
   *
   * The alternative was to annotate them, and that is exactly the wrong trade:
   * it would edit ~1,300 lines of someone else's working geometry to satisfy a
   * linter, and destroy the byte-identical property that makes them auditable
   * against the source. The rule is disabled HERE, for THESE files, rather
   * than weakened everywhere.
   */
  {
    files: ["src/components/twin/scenes/**/*.ts"],
    rules: { "@typescript-eslint/ban-ts-comment": "off" },
  },
]);

export default eslintConfig;
