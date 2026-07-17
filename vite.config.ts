/// <reference types="vitest/config" />

import { type UserConfig, defineConfig, type Plugin } from "vite";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { playwright } from "@vitest/browser-playwright";
import preact from "@preact/preset-vite";
import reactPlugin from "@vitejs/plugin-react";

// Toggle Preact/React at build time.
// true  → @preact/preset-vite aliases react, react-dom, react/jsx-runtime to preact/compat
// false → @vitejs/plugin-react uses the installed react, react-dom packages
const usePreact = true;

type Config = Required<UserConfig>;
const resolveAlias: Config["resolve"] = {
    alias: {
        "@": fileURLToPath(new URL("src", import.meta.url)),
    },
};

/**
 * Vite plugin: after build, copy index.html to route directories for static hosting.
 * - dist/404.html for GitHub Pages SPA fallback
 * - dist/<route>/index.html for each route, with __SPA_ROUTE__ injected for file:// support
 */
function spaCopyPlugin(routes: string[]): Plugin {
    const distDir = fileURLToPath(new URL("dist", import.meta.url));
    return {
        name: "spa-copy",
        apply: "build",
        closeBundle: {
            order: "post",
            async handler() {
                const indexPath = resolve(distDir, "index.html");
                const indexContent = await readFile(indexPath, "utf-8");

                // 404.html for GitHub Pages
                await writeFile(
                    resolve(distDir, "404.html"),
                    indexContent,
                    "utf-8"
                );

                // Route directories with __SPA_ROUTE__ injection
                // Skip "/" — it's the main index.html, no copy needed
                for (const route of routes) {
                    if (route === "/") continue;
                    const routeDir = resolve(distDir, route.replace(/^\//, ""));
                    await mkdir(routeDir, { recursive: true });
                    const routeContent = indexContent.replace(
                        "</head>",
                        `  <script>window.__SPA_ROUTE__ = ${JSON.stringify(route)};</script>\n</head>`
                    );
                    await writeFile(
                        resolve(routeDir, "index.html"),
                        routeContent,
                        "utf-8"
                    );
                }
            },
        },
    };
}

const browserInclude = ["**/tests/browser/**/*.test.{ts,tsx}"];
const browserTestConfig = {
    enabled: true,
    headless: true,
    instances: [
        {
            browser: "chromium",
            expect: {
                poll: {
                    timeout: 5000,
                },
            },
            include: browserInclude,
        },
    ],
    provider: playwright(),
} satisfies Config["test"]["browser"];

const testConfig: Config["test"] = {
    coverage: {
        enabled: true,
        include: ["src/**/*.{ts,tsx}"],
        provider: "v8",
        reportOnFailure: true,
        reporter: ["text", "json-summary", "html"],
    },
    environment: "node",
    exclude: ["**/node_modules/**", "**/dist/**"],
    globals: true,
    include: ["tests/**/*.test.{ts,tsx}"],
    projects: [
        {
            extends: true,
            test: {
                browser: browserTestConfig,
                name: "browser",
            },
        },
        {
            extends: true,
            test: {
                browser: {
                    enabled: false,
                },
                exclude: browserInclude,
                name: "node",
            },
        },
    ],
    setupFiles: "./tests/setup.ts",
};

const frameworkPlugins = usePreact
    ? preact({ jsxImportSource: "react", reactAliasesEnabled: true })
    : reactPlugin();

export default defineConfig({
    base: "./",
    build: {
        outDir: "dist",
        sourcemap: true,
    },
    clearScreen: false,
    plugins: [...[frameworkPlugins].flat(), spaCopyPlugin(["/", "/about"])],
    resolve: resolveAlias,
    server: {
        open: "index.html",
    },
    test: testConfig,
});
