import { Link, Navigate, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function App() {
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
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route
                    path="/index.html"
                    element={<Navigate replace to="/" />}
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default App;
