/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      sm: '700px',
      md: '1200px',
      lg: '1400px',
    },
    fontFamily: {
      special: ["'Bebas Neue'", "sans-serif"],
      display: ["'Cubano'", "sans-serif"],
      body: ["'Open Sans'", "sans-serif"],
    },
    fontSize: {
      sm: '0.9rem',
      md: '1rem',
      lg: '1.1rem',
      xl: '1.2rem',
      '2xl': '1.3rem',
      '3xl': '1.5rem',
      '4xl': '2rem',
      '5xl': '3rem',
      '6xl': '5rem',
      '7xl': '7rem',
      '8xl': '10rem'
    },
    lineHeight: {
      sm: '1.2rem',
      md: '1.2rem',
      lg: '1.2rem',
      xl: '1.2rem',
      '2xl': '1.2rem',
      '3xl': '1.4rem',
      '4xl': '1.8rem',
      '5xl': '2.4rem',
      '6xl': '2.8rem',
      '7xl': '3.2rem',
      '8xl': '3.6rem'
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
        "spin-slow": "spin 6s linear infinite",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("tailwindcss/plugin")(function ({ addComponents, theme }) {
      addComponents([
        {
          'h1': {
            fontFamily: theme('fontFamily.display'),
            fontSize: theme('fontSize.8xl'),
            lineHeight: theme('lineHeight.8xl'),
          },
          'h2': {
            fontFamily: theme('fontFamily.display'),
            fontSize: theme('fontSize.4xl'),
            lineHeight: theme('lineHeight.4xl'),
          },
          'h3': {
            fontFamily: theme('fontFamily.display'),
            fontSize: theme('fontSize.3xl'),
            lineHeight: theme('lineHeight.3xl'),
          },
          'h4': {
            fontFamily: theme('fontFamily.display'),
            fontSize: theme('fontSize.md'),
            lineHeight: theme('lineHeight.md'),
          },
          'h5': {
            fontFamily: theme('fontFamily.display'),
            fontSize: theme('fontSize.xl'),
            lineHeight: theme('lineHeight.xl'),
          },
          'h6': {
            fontFamily: theme('fontFamily.body'),
            fontSize: theme('fontSize.lg'),
            lineHeight: theme('lineHeight.lg'),
            fontWeight: theme('fontWeight.normal')
          },
          'p': {
            fontFamily: theme('fontFamily.body'),
            fontSize: theme('fontSize.md'),
            lineHeight: theme('lineHeight.md'),
            fontWeight: theme('fontWeight.normal')
          },
          'a': {
            fontFamily: theme('fontFamily.body'),
            fontSize: theme('fontSize.md'),
            lineHeight: theme('lineHeight.md'),
            fontWeight: theme('fontWeight.normal')
          }
        }, {
          '@media (min-width: 700px)': {
            'h1': {
              fontFamily: theme('fontFamily.display'),
              fontSize: theme('fontSize.8xl'),
              lineHeight: theme('lineHeight.8xl'),
            },
            'h2': {
              fontFamily: theme('fontFamily.display'),
              fontSize: theme('fontSize.4xl'),
              lineHeight: theme('lineHeight.4xl'),
            },
            'h3': {
              fontFamily: theme('fontFamily.display'),
              fontSize: theme('fontSize.3xl'),
              lineHeight: theme('lineHeight.3xl'),
            },
            'h4': {
              fontFamily: theme('fontFamily.display'),
              fontSize: theme('fontSize.md'),
              lineHeight: theme('lineHeight.md'),
            },
            'h5': {
              fontFamily: theme('fontFamily.display'),
              fontSize: theme('fontSize.xl'),
              lineHeight: theme('lineHeight.xl'),
            },
            'h6': {
              fontFamily: theme('fontFamily.body'),
              fontSize: theme('fontSize.lg'),
              lineHeight: theme('lineHeight.lg'),
              fontWeight: theme('fontWeight.normal')
            },
            'p': {
              fontFamily: theme('fontFamily.body'),
              fontSize: theme('fontSize.md'),
              lineHeight: theme('lineHeight.md'),
              fontWeight: theme('fontWeight.normal')
            },
            'a': {
              fontFamily: theme('fontFamily.body'),
              fontSize: theme('fontSize.md'),
              lineHeight: theme('lineHeight.md'),
              fontWeight: theme('fontWeight.normal')
            }
          }
        }, {
          '@media (min-width: 1100px)': {
            'h1': {
              fontFamily: theme('fontFamily.display'),
              fontSize: theme('fontSize.6xl'),
              lineHeight: theme('lineHeight.6xl'),
            },
            'h2': {
              fontFamily: theme('fontFamily.display'),
              fontSize: theme('fontSize.4xl'),
              lineHeight: theme('lineHeight.4xl'),
            },
            'h3': {
              fontFamily: theme('fontFamily.display'),
              fontSize: theme('fontSize.2xl'),
              lineHeight: theme('lineHeight.2xl'),
            },
            'h4': {
              fontFamily: theme('fontFamily.display'),
              fontSize: theme('fontSize.xl'),
              lineHeight: theme('lineHeight.xl'),
            },
            'h5': {
              fontFamily: theme('fontFamily.display'),
              fontSize: theme('fontSize.lg'),
              lineHeight: theme('lineHeight.lg'),
            },
            'h6': {
              fontFamily: theme('fontFamily.body'),
              fontSize: theme('fontSize.md'),
              lineHeight: theme('lineHeight.md'),
              fontWeight: theme('fontWeight.normal')
            },
            'p': {
              fontFamily: theme('fontFamily.body'),
              fontSize: theme('fontSize.md'),
              lineHeight: theme('lineHeight.md'),
              fontWeight: theme('fontWeight.normal')
            },
            'a': {
              fontFamily: theme('fontFamily.body'),
              fontSize: theme('fontSize.md'),
              lineHeight: theme('lineHeight.md'),
              fontWeight: theme('fontWeight.normal')
            }
          }
        }, {
          '@media (min-width: 1400px)': {
            'h1': {
              fontFamily: theme('fontFamily.display'),
              fontSize: theme('fontSize.8xl'),
              lineHeight: theme('lineHeight.8xl'),
            },
            'h2': {
              fontFamily: theme('fontFamily.display'),
              fontSize: theme('fontSize.5xl'),
              lineHeight: theme('lineHeight.5xl'),
            },
            'h3': {
              fontFamily: theme('fontFamily.display'),
              fontSize: theme('fontSize.3xl'),
              lineHeight: theme('lineHeight.3xl'),
            },
            'h4': {
              fontFamily: theme('fontFamily.display'),
              fontSize: theme('fontSize.2xl'),
              lineHeight: theme('lineHeight.2xl'),
            },
            'h5': {
              fontFamily: theme('fontFamily.display'),
              fontSize: theme('fontSize.xl'),
              lineHeight: theme('lineHeight.xl'),
            },
            'h6': {
              fontFamily: theme('fontFamily.body'),
              fontSize: theme('fontSize.lg'),
              lineHeight: theme('lineHeight.lg'),
              fontWeight: theme('fontWeight.normal')
            },
            'p': {
              fontFamily: theme('fontFamily.body'),
              fontSize: theme('fontSize.md'),
              lineHeight: theme('lineHeight.md'),
              fontWeight: theme('fontWeight.normal')
            },
            'a': {
              fontFamily: theme('fontFamily.body'),
              fontSize: theme('fontSize.md'),
              lineHeight: theme('lineHeight.md'),
              fontWeight: theme('fontWeight.normal')
            }
          }
        }
      ])
    })
  ],
}
