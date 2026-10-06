import { useState } from "react";

function Home() {
    const [count, setCount] = useState(0);

    return (
        <main className="p-6 text-center">
            <h1 className="mb-4 text-3xl font-bold">Hello World!</h1>
            <p className="mb-4">Welcome to the React SPA template.</p>
            <button
                className="cursor-pointer rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                onClick={() => setCount((c) => c + 1)}
            >
                Count is {count}
            </button>
        </main>
    );
}

export default Home;
