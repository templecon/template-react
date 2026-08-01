> [!NOTE]
> This is template repository for website projects, and not a library. Check out [library template](https://github.com/templecon/template-typescript-vite).

# How to use

```
git clone <repository-url> template-react
```

## Requirements

Node.js 24 or higher is required. The templates run TypeScript configuration and hooks directly with Node's built-in type stripping.

## Conventions and Rules

This project follows specific conventions and rules for code style, data validation, testing, and more. Please refer to the following documentation for detailed guidelines.

- [Typescript](./docs/rules/typescript.md)
- [Typescript Schema Validation](./docs/rules/typescript_schema.md)
- [Testing Guidelines](./docs/rules/tests.md)

---

## Static Hosting

Deploy the `dist/` output over HTTP(S), such as GitHub Pages or `pnpm preview`.
This template uses clean `BrowserRouter` URLs. GitHub Pages serves the
SPA-bearing `404.html` for a refresh or direct visit to a client route, so React
can render the matching page without changing the URL.

GitHub Pages fallback responses retain an HTTP 404 status even when React
renders a valid client route. This can affect SEO, crawlers, and link previews.
Unknown client routes render the application's `Page not found` view.

`file://` viewing is unsupported.

## Tests

Vitest has separate Node (`tests/unit/`) and jsdom (`tests/browser/`) projects. Browser fixtures use React Testing Library and exercise rendered user behavior, including route navigation.
