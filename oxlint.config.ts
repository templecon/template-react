import createBase from "@concertypin/config/oxlint";
import createFrontendOxlintConfig from "@concertypin/config/oxlint/frontend";
import { defineConfig } from "oxlint";

import reactConfig from "./scripts/linter/oxlint-react.ts";

const frontend = createFrontendOxlintConfig({
    tailwind: { entryPoint: "src/index.css" },
});

export default defineConfig({
    plugins: ["react"],
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
    settings: frontend.settings,
    extends: [createBase(), frontend, reactConfig],
});
