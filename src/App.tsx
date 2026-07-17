import { type ReactNode, type FC } from "react";
import { Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";

interface AppProps {
    children?: ReactNode;
}

const App: FC<AppProps> = ({ children }) => {
    const isFile = window.location.protocol === "file:";

    // File:// protocol: use __SPA_ROUTE__ injected by the build plugin, full page navigations
    if (isFile) {
        const route: string = window.__SPA_ROUTE__ || "/";

        const navigate = (to: string) => {
            window.location.href =
                to === "/" ? "./index.html" : `.${to}/index.html`;
        };

        return (
            <div className="min-h-screen">
                <nav className="flex gap-4 items-center border-b px-6 py-3 bg-gray-100">
                    <a
                        href="./index.html"
                        className="text-blue-600 hover:underline"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate("/");
                        }}
                    >
                        Home
                    </a>
                    <a
                        href="./about/index.html"
                        className="text-blue-600 hover:underline"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate("/about");
                        }}
                    >
                        About
                    </a>
                </nav>
                {route === "/about" ? <About /> : <Home />}
            </div>
        );
    }

    // HTTP: use React Router for SPA navigation
    return (
        <div className="min-h-screen">
            <nav className="flex gap-4 items-center border-b px-6 py-3 bg-gray-100">
                <Link to="/" className="text-blue-600 hover:underline">
                    Home
                </Link>
                <Link to="/about" className="text-blue-600 hover:underline">
                    About
                </Link>
            </nav>
            {children}
        </div>
    );
};

export default App;
