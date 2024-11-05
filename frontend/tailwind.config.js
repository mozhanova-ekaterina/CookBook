import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#ff006e",
          "primary-content": "#ffffff",
          secondary: "#14b8a6",
          accent: "#37cdbe",
          neutral: "#3d4451",
          "base-100": "#ffffff",
        },
      },
    ],
  },
};
