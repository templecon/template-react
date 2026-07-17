> [!NOTE]
> This is template repository for website projects, and not a library. Check out [library template](https://github.com/templecon/template-typescript-vite).

# How to use

```
git clone <repository-url> template-react
```

## Requirements

Node.js version 22.18.0 or higher is recommended, since it has basic TypeScript support, which is used on oxlint.config.ts.
Older versions will:

- Older than v22.6.0: Not work, migrate Node version or oxlint.config.ts to .js.
- Between v22.6.0 and v22.18.0: Work, but require `--experimental-transform-types`(since v22.7.0) or `--experimental-strip-types`(since v22.6.0) flag on `NODE_OPTIONS` environment variable.
- v22.18.0 or higher: Work without flags.

## Conventions and Rules

This project follows specific conventions and rules for code style, data validation, testing, and more. Please refer to the following documentation for detailed guidelines.

- [Typescript](./docs/rules/typescript.md)
- [Typescript Schema Validation](./docs/rules/typescript_schema.md)
- [Testing Guidelines](./docs/rules/tests.md)

---

## Preact-First Module Contract

This template ships with **Preact** as the default runtime, but all application source code imports from React-compatible module specifiers (`"react"`, `"react-dom"`, `"react-dom/client"`, `"react-router-dom"`). The framework selection is controlled by a single top-level toggle in `vite.config.ts`:

```ts
// vite.config.ts
const usePreact = true; // ← change to false for real React
```

### Vite Alias Mapping (Preact mode)

When `usePreact = true`, `@preact/preset-vite` (with `reactAliasesEnabled: true`) rewrites these module specifiers at build time:

| Import              | Resolves to                 |
| ------------------- | --------------------------- |
| `react`             | `preact/compat`             |
| `react-dom`         | `preact/compat`             |
| `react-dom/client`  | `preact/compat`             |
| `react/jsx-runtime` | `preact/compat/jsx-runtime` |

### Why not native browser import maps?

This template bundles its output for local `file://` viewing and static hosting (GitHub Pages). Native browser import maps would require externalized/CDN modules and conflict with the bundled, self-contained output that the `spaCopyPlugin` produces. The Vite alias approach keeps the full SPA file set local and protocol-agnostic.

---

## Switching to React

Changing the runtime from Preact to React requires **zero source code changes**. Do the following:

1. **Set `usePreact` to `false`** in `vite.config.ts`:

    ```diff
    - const usePreact = true;
    + const usePreact = false;
    ```

    This activates `@vitejs/plugin-react` instead of `@preact/preset-vite`.

2. **(Optional) Remove Preact dependencies** from `package.json` if you no longer need them:

    ```bash
    pnpm remove preact @preact/preset-vite
    ```

3. **(Optional) Swap the browser test renderer** (for a purely Preact setup without the compat alias):
    ```bash
    pnpm remove vitest-browser-react
    pnpm add -D vitest-browser-preact
    ```
    (The template ships with `vitest-browser-react` so the same test source works in both modes via the alias. Keep `vitest-browser-react` for React mode — it is the correct renderer. Only switch to `vitest-browser-preact` if you want a purely Preact test suite.)

Application code, router imports, TypeScript types, and JSX will continue to work as-is because they are written against the shared React API subset.

---

## Compatibility Boundary

`preact/compat` is a compatibility layer, **not** a mathematically complete subset of every React version. Preact's official documentation states:

> "preact/compat aims for broad compatibility with React, but does not implement every React feature."

In practice:

- **Supported**: `useState`, `useEffect`, `useRef`, `useCallback`, `useMemo`, `useContext`, `createContext`, `createRoot`, `ReactNode`, `FC`, JSX runtime, React Router (current 7.x), and the vast majority of React DOM APIs.
- **Not guaranteed**: Very new React APIs (late additions to React 18/19), React-specific internals, or libraries with deep React version checks. Preact tracks the current and previous React majors and adds partial support for newer features.
- **Lint rules**: oxlint's built-in `react` plugin (native Rust, not ESLint) validates JSX and hooks. The config explicitly disables `react/react-in-jsx-scope` because the template uses the automatic JSX runtime.

Keep application code to the shared React API subset. If you need a React-only feature that Preact compat doesn't support, set `usePreact = false` and use the real React packages already installed.

### Useful Links

- [oxlint plugins documentation](https://oxc.rs/docs/guide/usage/linter/plugins) — native React plugin rules
- [Preact Getting Started](https://preactjs.com/guide/v10/getting-started/)
- [Preact Differences from React](https://preactjs.com/guide/v10/differences-to-react/)
