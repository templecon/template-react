/* @refresh reload */
import "@/index.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "@/App";
import Home from "@/pages/Home";
import About from "@/pages/About";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
    throw new Error(
        "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?"
    );
}

if (window.location.protocol === "file:") {
    // file:// protocol: render without BrowserRouter, routing handled inside App
    createRoot(root!).render(<App />);
} else {
    // HTTP: full SPA with BrowserRouter
    createRoot(root!).render(
        <BrowserRouter>
            <App>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="*" element={<Home />} />
                </Routes>
            </App>
        </BrowserRouter>
    );
}
