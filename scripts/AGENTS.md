This directory is not a source code for production, but to save config files and scripts related to CI/CD, build, tests, lint, etc.

Key files:

- `linter/oxlint-react.ts` : Native oxlint `react` plugin rules (JSX, hooks) using the `react/*` namespace.

### Shared Oxlint configuration

The project consumes ESLint-compatible rules from `@concertypin/config/oxlint/frontend`, which provides
general-purpose rules shared across multiple templates. The shared preset is extended in the root
`oxlint.config.ts` alongside the framework-specific override above.

Keep general rule overrides in the root `oxlint.config.ts` and framework-specific overrides in
`oxlint-react.ts`.
