import { useState } from "react";

function Home() {
    const [count, setCount] = useState(0);

    return (
        <main className="text-center p-6">
            <h1 className="text-3xl font-bold mb-4">Hello World!</h1>
            <p className="mb-4">Welcome to the React SPA template.</p>
            <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
                onClick={() => setCount((c) => c + 1)}
            >
                Count is {count}
            </button>
        </main>
    );
}

export default Home;
