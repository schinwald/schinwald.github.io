/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    screens: {
      sm: '700px',
      md: '1100px',
      lg: '1400px'
    },
    fontFamily: {
      special: ["'Bebas Neue'", "sans-serif"],
      display: ["'Cubano'", "sans-serif"],
      body: ["'Open Sans'", "sans-serif"],
    },
    fontSize: {
      sm: '0.8rem',
      md: '0.9rem',
      lg: '1rem',
      xl: '1.2rem',
      '2xl': '1.3rem',
      '3xl': '1.5rem',
      '4xl': '2rem',
      '5xl': '3rem',
      '6xl': '5rem',
      '7xl': '7rem',
      '8xl': '10rem'
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: {
          DEFAULT: "#111111",
          soft: "#222222",
          overlay: "#434343",
        },
        foreground: {
          DEFAULT: "#ffffff",
          soft: "#ffffff",
          overlay: "#ffffff",
        },
        primary: {
          DEFAULT: "#ee3866",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#ffbc2c",
          foreground: "#111111",
        },
        tertiary: {
          DEFAULT: "#4fc3c7",
          foreground: "#0b2728",
        },
        success: {
          DEFAULT: "#22c55e",
          foreground: "#22c55e",
        },
        destructive: {
          DEFAULT: "#ef4444",
          foreground: "#ef4444",
        },
        muted: {
          DEFAULT: "",
          foreground: "",
        },
        accent: {
          DEFAULT: "",
          foreground: "",
        },
        popover: {
          DEFAULT: "",
          foreground: "",
        },
        card: {
          DEFAULT: "",
          foreground: "",
        },
      },
      borderRadius: {
        lg: "10px",
        md: "8px",
        sm: "6px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("tailwindcss/plugin")(function ({ addBase, theme }) {
      addBase({
        'h1': {
          fontFamily: theme('fontFamily.display'),
          fontSize: theme('fontSize.8xl'),
        },
        'h2': {
          fontFamily: theme('fontFamily.display'),
          fontSize: theme('fontSize.5xl'),
        },
        'h3': {
          fontFamily: theme('fontFamily.display'),
          fontSize: theme('fontSize.3xl'),
        },
        'h4': {
          fontFamily: theme('fontFamily.display'),
          fontSize: theme('fontSize.2xl'),
        },
        'h5': {
          fontFamily: theme('fontFamily.display'),
          fontSize: theme('fontSize.xl'),
        },
        'h6': {
          fontFamily: theme('fontFamily.body'),
          fontSize: theme('fontSize.lg'),
          fontWeight: theme('fontWeight.normal')
        },
        'p': {
          fontFamily: theme('fontFamily.body'),
          fontSize: theme('fontSize.md'),
          fontWeight: theme('fontWeight.normal')
        },
        'a': {
          fontFamily: theme('fontFamily.body'),
          fontSize: theme('fontSize.md'),
          fontWeight: theme('fontWeight.normal')
        }
      })
    })
  ],
}
