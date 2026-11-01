/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./layout/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: '390px',
      md: '768px',
      lg: '1280px',
      xl: '1440px',
      full: '1920px',
    },
    extend: {
      fontFamily: {
        geist:['Geist', 'sans-serif'],
        jetbrains:['JetBrains Mono', 'monospace'],
      },
      colors: {
        // Backgrounds
        background: "#09090B",
        surface: "#131316",
        card: "#13131A",

        // Borders
        border: "#2A2A36",

        // Brand Colors
        primary: {
          DEFAULT: "#7C5CFF",
          hover: "#9275FF",
          active: "#6842FF",
          light: "#A78BFA",
        },

        // Text
        text: {
          DEFAULT: "#FFFFFF",
          secondary: "#E5E1E6",
          muted: "#94A3B8",
        },

        // Status
        success: "#10B981",
        warning: "#F59E0B",
        danger: "#EF4444",
        loading:"#A855F7",

        // Charts
        chart: {
          purple: "#7C5CFF",
          violet: "#A78BFA",
          blue: "#60A5FA",
          green: "#22C55E",
          orange: "#F59E0B",
          red: "#EF4444",
        },
      },

      borderRadius: {
        xl: "16px",
        "2xl": "20px",
      },

      boxShadow: {
        card: "0 8px 30px rgba(0,0,0,.35)",

        glow: "0 0 35px rgba(124,92,255,.25)",

        button: "0 8px 25px rgba(124,92,255,.35)",
      },

      backgroundImage: {
        "hero-gradient":
            "radial-gradient(circle at center, rgba(124,92,255,.18), transparent 70%)",

        "button-gradient":
            "linear-gradient(135deg,#7C5CFF 0%,#9275FF 100%)",

        "card-gradient":
            "linear-gradient(180deg,#1B1B24 0%,#15151C 100%)",
      },
    },
  },
  plugins: [],
}

