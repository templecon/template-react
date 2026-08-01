if (import.meta.env.VITEST_MODE === "browser") {
    await import("@testing-library/jest-dom/vitest");
}
