import frontendConfig from "@concertypin/config/oxlint/frontend";
import { defineConfig } from "oxlint";

import reactConfig from "./scripts/linter/oxlint-react.ts";

export default defineConfig({
    ...frontendConfig("src/index.css"),
    $schema: "./node_modules/oxlint/configuration_schema.json",
    plugins: ["typescript", "unicorn", "import", "vitest", "promise", "react"],
    env: {
        builtin: true,
    },
    ignorePatterns: [
        "**/node_modules/**",
        "**/dist/**",
        "**/dist-ts/**",
        "**/coverage/**",
        "**/.cache/**",
        "**/.vscode/**",
        "**/.git/**",
    ],
    options: {
        denyWarnings: true,
        reportUnusedDisableDirectives: "error",
        typeAware: true,
        typeCheck: true,
    },
    extends: [reactConfig],
});
