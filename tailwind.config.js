module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./layouts/**/*.{js,ts,jsx,tsx}",
    ],
    safelist: [
        "html",
        "body",
        "bracket-active",
        "bracket-left",
        "bracket-right",
    ],
    theme: {
        extend: {
            colors: {
                gray: {
                    light: "rgb(255, 255, 255)",
                    dark: "#0B1418",
                },
                green: "#48D597",
                yellow: "#F5CF65",
                blue: {
                    light: "#0284FE",
                    dark: "rgb(0, 32, 61)",
                },
                red: "#D87087",
            },
        },
        fontSize: {
            xs: ".75rem",
            sm: ".875rem",
            base: "1rem",
            lg: "1.125rem",
            xl: "1.25rem",
            "2xl": "1.5rem",
            "3xl": "1.875rem",
            "4xl": "2.25rem",
            "5xl": "3rem",
            "6xl": "4rem",
        },
        fontFamily: {
            sans: [
                "-apple-system",
                "BlinkMacSystemFont",
                "Helvetica Neue",
                "Arial",
                "sans-serif",
            ],
            serif: [
                "Georgia",
                "-apple-system",
                "BlinkMacSystemFont",
                "Helvetica Neue",
                "Arial",
                "sans-serif",
            ],
            mono: [
                "Menlo",
                "Monaco",
                "Consolas",
                "Roboto Mono",
                "SFMono-Regular",
                "Segoe UI",
                "Courier",
                "monospace",
            ],
        },
    },
    plugins: [],
};
