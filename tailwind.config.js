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
          secondary: "green",
          accent: "green",
          neutral: "#e5e5e5",
          "base-100": "#ffffff", //main bg
          warning: "#fb5607",
          error: "#e63946",
          info: "#00b4d8",
          success: "#06d6a0",
        },
      },
    ],
  },
};
