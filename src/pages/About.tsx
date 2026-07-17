import { type FC } from "react";

const About: FC = () => {
    return (
        <main className="text-center p-6">
            <h1 className="text-3xl font-bold mb-4">About This Template</h1>
            <p className="mb-2">
                This is a <strong>Preact SPA template</strong> built with Vite.
            </p>
            <p className="mb-2">
                Source imports use the React-compatible module contract. At
                build time, a single toggle in <code>vite.config.ts</code> (
                <code>const usePreact = true</code>) selects either Preact (via{" "}
                <code>@preact/preset-vite</code>) or real React (via{" "}
                <code>@vitejs/plugin-react</code>) — no component source changes
                are needed.
            </p>
            <p className="mb-2">
                It supports static hosting on GitHub Pages and local{" "}
                <code>file://</code> viewing via a custom Vite plugin that
                copies <code>index.html</code> to route directories.
            </p>
            <p>
                Testing is done with <code>vitest-browser-react</code> in Vitest
                Browser Mode, which exercises the selected framework through the
                React-compatible render API.
            </p>
        </main>
    );
};

export default About;
