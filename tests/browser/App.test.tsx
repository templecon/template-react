import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { expect, test } from "vitest";
import App from "@/App";

test("renders the home page and navigates to About", () => {
    expect(import.meta.env.VITEST_MODE).toBe("browser");

    render(
        <MemoryRouter initialEntries={["/"]}>
            <App />
        </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: "Count is 0" }));
    expect(
        screen.getByRole("button", { name: "Count is 1" })
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("link", { name: "About" }));
    expect(
        screen.getByRole("heading", { name: "About This Template" })
    ).toBeInTheDocument();
});

test("normalizes the physical entry path to Home", () => {
    render(
        <MemoryRouter initialEntries={["/index.html"]}>
            <App />
        </MemoryRouter>
    );

    expect(
        screen.getByRole("heading", { name: "Hello World!" })
    ).toBeInTheDocument();
});

test("renders a not-found page for an unknown route", () => {
    render(
        <MemoryRouter initialEntries={["/missing"]}>
            <App />
        </MemoryRouter>
    );

    expect(
        screen.getByRole("heading", { name: "Page not found" })
    ).toBeInTheDocument();
});
