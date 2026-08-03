> [!NOTE]
> This is template repository for website projects, and not a library. Check out [library template](https://github.com/templecon/template-typescript-vite).

# How to use

```
git clone <repository-url> template-react
```

## Requirements

Node.js 26 or higher is required. The templates run TypeScript configuration and hooks directly with Node's built-in type stripping.

Node 26 no longer bundles Corepack, so install the pnpm version pinned in the `packageManager` field of `package.json`:

```sh
npm install -g pnpm@10.17.1
```

Then install the dependencies:

```sh
pnpm install
```

`postinstall` registers the git hooks (via `simple-git-hooks`), so run `pnpm install` before your first commit. The pre-commit hook runs the non-mutating `check` script (formatting, lint, and tests); when it fails, apply fixes with `pnpm format` and `pnpm lint`.

## Conventions and Rules

This project follows specific conventions and rules for code style, data validation, testing, and more. Please refer to the following documentation for detailed guidelines.

- [Typescript](./docs/rules/typescript.md)
- [Typescript Schema Validation](./docs/rules/typescript_schema.md)
- [Testing Guidelines](./docs/rules/tests.md)

---

## Static Hosting

Deploy the `dist/` output over HTTP(S). The included deploy workflow
(`.github/workflows/deploy.yml`) builds with the GitHub Pages base path and
publishes the result as a GitHub Pages site. A plain `pnpm build` emits
root-absolute asset URLs (`base: "/"`), so that output serves correctly from a
domain root — a GitHub Pages user site or a custom domain — or via
`pnpm preview`. For a GitHub Pages project site under a subpath
(`https://<user>.github.io/<repo>/`), rebuild with a matching base, e.g.
`pnpm build --base "/<repo>/"`, before deploying `dist/`.

This template uses clean `BrowserRouter` URLs. GitHub Pages serves the
SPA-bearing `404.html` for a refresh or direct visit to a client route, so React
can render the matching page without changing the URL.

GitHub Pages fallback responses retain an HTTP 404 status even when React
renders a valid client route. This can affect SEO, crawlers, and link previews.
Unknown client routes render the application's `Page not found` view.

`file://` viewing is unsupported.

## Tests

Vitest has separate Node (`tests/unit/`) and jsdom (`tests/browser/`) projects. Browser fixtures use React Testing Library and exercise rendered user behavior, including route navigation.
