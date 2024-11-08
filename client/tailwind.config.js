/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        bg: "var(--bg)",
        "secondary-bg": "var(--secondary-bg)",
        "text-1": "var(--text-1)",
        "text-2": "var(--text-2)",
        border: "var(--border)",
        error: "var(--error)",
      },
      boxShadow: {
        main: "0 0 10px var(--shadow)",
      },
      borderRadius: {
        4: "4px",
        6: "6px",
        10: "10px",
      },
    },
  },
  plugins: [],
};
