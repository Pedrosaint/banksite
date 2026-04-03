/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#13b5a3",
          50: "#e6f7f5",
          100: "#ccefeb",
          200: "#99dfd7",
          300: "#66cfc3",
          400: "#33bfaf",
          500: "#13b5a3",
          600: "#0f9e8f",
          700: "#0b7a6f",
          800: "#08574f",
          900: "#04342f",
        },
        dark: "#1a1a2e",
        light: "#f8f9fa",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["Poppins", "system-ui", "sans-serif"],
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInLeft: {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        fadeInRight: {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease-out both",
        "fade-in-left": "fadeInLeft 0.6s ease-out both",
        "fade-in-right": "fadeInRight 0.6s ease-out both",
        "scale-in": "scaleIn 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};
