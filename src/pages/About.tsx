function About() {
    return (
        <main className="text-center p-6">
            <h1 className="text-3xl font-bold mb-4">About This Template</h1>
            <p className="mb-2">
                This is a <strong>React SPA template</strong> built with Vite.
            </p>
            <p className="mb-2">
                React Router handles application navigation. GitHub Pages serves
                this app's custom 404 page for direct route loads, then React
                renders the matching client route.
            </p>
            <p className="mb-2">
                Tests use <code>@testing-library/react</code> in Vitest with
                jsdom to exercise rendered user behavior.
            </p>
        </main>
    );
}

export default About;
