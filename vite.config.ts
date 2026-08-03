/// <reference types="vitest/config" />

import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { type UserConfig, defineConfig } from "vite";
import reactPlugin from "@vitejs/plugin-react";

type Config = Required<UserConfig>;
const resolveAlias: Config["resolve"] = {
    alias: {
        "@": fileURLToPath(new URL("src", import.meta.url)),
    },
};

const testConfig: Config["test"] = {
    coverage: {
        enabled: true,
        include: ["src/**/*.{ts,tsx}"],
        provider: "v8",
        reportOnFailure: true,
        reporter: ["text", "json-summary", "html"],
    },
    exclude: ["**/node_modules/**", "**/dist/**"],
    globals: true,
    setupFiles: "./tests/setup.ts",
    projects: [
        {
            extends: true,
            test: {
                environment: "node",
                include: ["tests/unit/**/*.test.ts"],
                env: {
                    VITEST_MODE: "unit",
                },
                name: "unit",
            },
        },
        {
            extends: true,
            test: {
                environment: "jsdom",
                include: ["tests/browser/**/*.test.{ts,tsx}"],
                env: {
                    VITEST_MODE: "browser",
                },
                name: "browser",
            },
        },
    ],
};

export default defineConfig({
    base: "/",
    build: {
        outDir: "dist",
        rolldownOptions: {
            input: {
                main: resolve(import.meta.dirname, "index.html"),
                notFound: resolve(import.meta.dirname, "404.html"),
            },
        },
        sourcemap: true,
    },
    clearScreen: false,
    plugins: [reactPlugin()],
    resolve: resolveAlias,
    server: {
        open: "/",
    },
    test: testConfig,
});
