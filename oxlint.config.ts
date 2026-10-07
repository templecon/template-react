import createFrontendOxlintConfig from "@concertypin/config/oxlint/frontend";
import { defineConfig } from "oxlint";

import reactConfig from "./scripts/linter/oxlint-react.ts";

const frontend = createFrontendOxlintConfig("src/index.css");

export default defineConfig({
    jsPlugins: ["oxlint-tailwindcss"],
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
    settings: { tailwindcss: { entryPoint: "src/index.css" } },
    extends: [frontend, reactConfig],
});
