/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        heading: ["Outfit", "sans-serif"],
      },

      colors: {
        primary: "#161E54",
        secondary: "#FFFCFB",
        accent: "#093FB4",
        text: {
          primary: "rgb(12, 4, 33)",
          secondary: "#452829",
          muted: "#5d667a",
          inverted: "#ffffff",
        },

        ui: {
          background: "#EAEFEF",
          surface: "#FFFCFB",
          border: "#e2e8f0",
          error: "#ED3500",
          success: "#22c55e",
        },
      },

      spacing: {
        xs: "clamp(4px, 0.5vw, 8px)",
        sm: "clamp(8px, 1vw, 12px)",
        md: "clamp(16px, 2vw, 20px)",
        lg: "clamp(24px, 3vw, 32px)",
        xl: "clamp(32px, 4vw, 48px)",
        xxl: "clamp(48px, 6vw, 72px)",

        gapSm: "clamp(1rem, 2vw, 1.5rem)",
        gapMd: "clamp(2rem, 3vw, 3rem)",
        gapLg: "clamp(3rem, 4vw, 4rem)",
      },

      fontSize: {
        base: "clamp(14px, 2.5vw, 16px)",
        sm: "clamp(12px, 2vw, 14px)",
        md: "clamp(16px, 2.8vw, 18px)",
        lg: "clamp(18px, 3.5vw, 20px)",

        h1: "clamp(1.6rem, 6vw, 2.6rem)",
        h2: "clamp(1.5rem, 5vw, 2rem)",
        h3: "clamp(1.3rem, 4vw, 1.8rem)",
      },

      zIndex: {
        base: "0",
        map: "10",
        controls: "20",
        sidebar: "30",
        overlay: "40",
        modal: "50",
        tooltip: "60",
        toast: "70",
      },

      borderRadius: {
        sm: "6px",
        md: "12px",
        lg: "20px",
        pill: "50px",
      },
      boxShadow: {
        soft: "0 4px 12px rgba(0,0,0,0.05)",
        medium: "0 8px 24px rgba(69, 40, 41, 0.12)",
        floating: "0 10px 30px -5px rgba(0,0,0,0.2)",
      },

      animation: {
        "fade-in": "fadeIn 0.4s ease-out forwards",
        "slide-up": "slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-in-left":
          "slideInLeft 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideInLeft: {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },

      backgroundImage: {
        "gradient-card":
          "linear-gradient(to bottom, rgba(255, 255, 255, 0.9) 0%, rgba(253, 251, 247, 1) 100%)",
      },
      opacity: {
        glass: "0.92",
      },
    },
  },
  plugins: [],
};
