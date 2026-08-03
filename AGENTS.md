# AGENTS.md

## Project

This React SPA builds HTTP(S)-hosted assets for GitHub Pages. It uses clean
`BrowserRouter` URLs and a SPA-bearing custom `404.html` for refresh and direct
client-route loads. GitHub Pages keeps an HTTP 404 status for those fallback
responses, which can affect SEO, crawlers, and link previews. `file://` viewing
is unsupported.

## Commands

```bash
pnpm dev
pnpm build
pnpm format
pnpm lint
pnpm test
pnpm run check
```

## Important files

- `src/index.tsx`: application entry point and `BrowserRouter` boundary.
- `src/App.tsx`: application navigation and route tree, including the explicit not-found route.
- `vite.config.ts`: Vite multi-page HTML inputs and Vitest project boundaries.
- `src/env.d.ts`: Vite types shared with `tests/env.d.ts` through a symbolic link.
- `.vscode/settings.json`: editor formatting, import, Oxlint, and generated-file settings.
- `tests/unit/`: Node-only tests for pure logic.
- `tests/browser/`: jsdom Testing Library tests for rendered user behavior.

## Conventions

- Use TypeScript and TSX for source and tests; keep components as named functions unless a callback value is specifically needed.
- Use pnpm and keep `pnpm-lock.yaml` in sync with `package.json`.
- Run `pnpm run check` after changes that affect source, tests, or configuration.
