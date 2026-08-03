import { expect, test } from "vitest";

test("runs without a DOM in the unit project", () => {
    expect(import.meta.env.VITEST_MODE).toBe("unit");
    expect(typeof document).toBe("undefined");
});
