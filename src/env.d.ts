/// <reference types="vite/client" />
/**
 * @fileoverview
 * Definitions for the `import.meta.env` object in tests and src.
 *
 * tests/env.d.ts is symbolic link to src/env.d.ts.
 */
interface ImportMetaEnv {
    readonly VITEST_MODE?: "unit" | "browser";
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

interface ViteTypeOptions {
    strictImportMetaEnv: unknown;
}
