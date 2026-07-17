import { cleanup, render } from "vitest-browser-react/pure";
import { afterEach, expect, test } from "vitest";
import Home from "@/pages/Home";

afterEach(async () => {
    await cleanup();
});

test("renders Hello World heading", async () => {
    const screen = await render(<Home />);
    await expect.element(screen.getByText("Hello World!")).toBeVisible();
});

test("counter increments on click", async () => {
    const screen = await render(<Home />);
    const button = screen.getByRole("button");
    await expect.element(button).toBeVisible();
    await expect.element(screen.getByText("Count is 0")).toBeVisible();
    await button.click();
    await expect.element(screen.getByText("Count is 1")).toBeVisible();
});
