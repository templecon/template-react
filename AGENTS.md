# AGENTS.md

This file provides guidance to AI agents when working with code in this repository.
All agents, such as Claude Code, should keep `**/AGENTS.md` in mind.

## Project Type

This is a **Preact SPA template** built with Vite. Source imports use the React-compatible module contract so the runtime can be switched between Preact and real React by a single build toggle. It uses a custom Vite plugin to copy `index.html` to route directories at build time, enabling static hosting on GitHub Pages and local `file://` viewing without a HashRouter or Node-based SSR.

## Development Commands

```bash
# Start development server with HMR
pnpm dev

# Build for production (outputs SPA to dist/)
pnpm build

# Format code
pnpm format

# Lint code
pnpm lint

# Run tests (Vitest with browser and node environments)
pnpm test
```

## Architecture

- **Framework toggle**: `vite.config.ts` has a top-level `const usePreact = true`. When `true`, `@preact/preset-vite` aliases `react`, `react-dom`, and `react/jsx-runtime` to `preact/compat`. When `false`, `@vitejs/plugin-react` uses the real React packages (already installed as dependencies). The plugins array normalizes both single-Plugin and Plugin[] returns via `[frameworkPlugins].flat()`.
- **Entry point**: `src/index.tsx` — Mounts the app using `createRoot` from `react-dom/client`. On `file://` protocol it renders without `BrowserRouter`; on HTTP it uses `react-router-dom` for full SPA navigation.
- **Routing**: Uses `react-router-dom` for HTTP (clean History API URLs) and a simple `__SPA_ROUTE__`-based approach for `file://` (full page navigations to copied `index.html` files).
- **Build plugin**: A custom Vite plugin (`spaCopyPlugin` in `vite.config.ts`) copies `dist/index.html` to `dist/404.html` (GitHub Pages fallback) and route-specific directories (e.g. `dist/about/index.html`), injecting `window.__SPA_ROUTE__` for `file://` support.
- **ES modules** throughout (`"type": "module"` in package.json)
- **Output format**: Generates SPA files in the `dist/` directory with relative asset paths (`base: "./"`).
- **Type definitions**: TypeScript throughout with `@types/react` providing the stable type contract for both framework modes.
- **Testing**: Uses `vitest-browser-react` for component rendering in Vitest Browser Mode (browser tests), and standard Vitest for Node.js unit tests. The same test renderer works in both framework modes since Preact compat aliases the React imports.
- **Linting**: Uses oxlint with the native `react` plugin (Rust, not ESLint bridge). React-specific rules like `react/jsx-key`, `react/rules-of-hooks`, and `react/exhaustive-deps` are configured in `scripts/linter/oxlint-react.ts` and extended from `oxlint.config.ts`. `react/react-in-jsx-scope` is disabled because the template uses the automatic JSX runtime.

## Coding Standards

If you can't access the project's convention, such as hono, typescript, typescript-schema, ask user for adding MCP server.
MCP Server:

- Endpoint: https://conventions.aieuroka.workers.dev/mcp (for most clients), https://conventions.aieuroka.workers.dev/with-tool/mcp (for GitHub Copilot, which doesn't support resource retrieval)
- Streamable HTTP, without authentication

## TypeScript Configuration

- **Path alias**: `@/*` maps to `src/*` (configured in `tsconfig.base.json`)
- **Project references**: Uses `tsconfig.json` with `app` and `node` references
- **Strict mode** enabled
- **JSX**: Set to `"preserve"` with `"jsxImportSource": "react"` — the same JSX transform works for both Preact and React at runtime.

## Package Manager

This project uses **pnpm**.

## Using This Template

Immediately after creating a project from this template, upgrade all dependencies and refresh the lockfile:

```bash
pnpm up --latest
```

Run the project's format, lint, test, and build checks after the upgrade and resolve every resulting error before continuing development.
