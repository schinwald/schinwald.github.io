/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: ["./app/**/*.{js,jsx,ts,tsx}"],
	theme: {
		screens: {
			sm: "700px",
			md: "1000px",
			lg: "1400px",
		},
		fontFamily: {
			special: ["'Bebas Neue'", "sans-serif"],
			display: ["'Cubano'", "sans-serif"],
			body: ["'Open Sans'", "sans-serif"],
			math: ["math", "sans-serif"],
		},
		fontSize: {
			sm: "0.8rem",
			md: "0.9rem",
			lg: "1.1rem",
			xl: "1.2rem",
			"2xl": "1.3rem",
			"3xl": "1.5rem",
			"4xl": "2rem",
			"5xl": "3rem",
			"6xl": "5rem",
			"7xl": "7rem",
			"8xl": "10rem",
			DEFAULT: "0.9rem",
		},
		lineHeight: {
			sm: "1.2rem",
			md: "1.5rem",
			lg: "1.2rem",
			xl: "1.2rem",
			"2xl": "1.2rem",
			"3xl": "1.4rem",
			"4xl": "1.8rem",
			"5xl": "2.4rem",
			"6xl": "2.8rem",
			"7xl": "3.2rem",
			"8xl": "3.6rem",
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
				wiggle: {
					"0%, 100%": { transform: "rotate(-15deg)" },
					"50%": { transform: "rotate(15deg)" },
				},
				"heart-beat": {
					"0%": { transform: "scale(1);" },
					"14%": { transform: "scale(1.3);" },
					"28%": { transform: "scale(1);" },
					"42%": { transform: "scale(1.3);" },
					"70%": { transform: "scale(1);" },
				},
				"flip-horizontal": {
					"50%": { transform: "rotateY(180deg)" },
				},
				"flip-vertical": {
					"50%": { transform: "rotateX(180deg)" },
				},
				swing: {
					"20%": {
						transform: "rotate3d(0, 0, 1, 15deg)",
					},
					"40%": {
						transform: "rotate3d(0, 0, 1, -10deg)",
					},
					"60%": {
						transform: "rotate3d(0, 0, 1, 5deg)",
					},
					"80%": {
						transform: "rotate3d(0, 0, 1, -5deg)",
					},
					to: {
						transform: "rotate3d(0, 0, 1, 0deg)",
					},
				},
				"rubber-band": {
					from: {
						transform: "scale3d(1, 1, 1)",
					},
					"30%": {
						transform: "scale3d(1.25, 0.75, 1)",
					},
					"40%": {
						transform: "scale3d(0.75, 1.25, 1)",
					},
					"50%": {
						transform: "scale3d(1.15, 0.85, 1)",
					},
					"65%": {
						transform: "scale3d(0.95, 1.05, 1)",
					},
					"75%": {
						transform: "scale3d(1.05, 0.95, 1)",
					},
					to: {
						transform: "scale3d(1, 1, 1)",
					},
				},
				flash: {
					"25%, 40%": { opacity: "0" },
					"50%": { opacity: "1" },
					"75%": { opacity: "0" },
				},
				"head-shake": {
					"0%": {
						transform: "translateX(0)",
					},
					"6.5%": {
						transform: "translateX(-6px) rotateY(-9deg)",
					},
					"18.5%": {
						transform: "translateX(5px) rotateY(7deg)",
					},
					"31.5%": {
						transform: "translateX(-3px) rotateY(-5deg)",
					},
					"43.5%": {
						transform: "translateX(2px) rotateY(3deg)",
					},
					"50%": {
						transform: "translateX(0)",
					},
				},
				wobble: {
					from: {
						transform: "translate3d(0, 0, 0)",
					},
					"15%": {
						transform: "translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg)",
					},
					"30%": {
						transform: "translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg)",
					},
					"45%": {
						transform: "translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg)",
					},
					"60%": {
						transform: "translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg)",
					},
					"75%": {
						transform: "translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg)",
					},
					to: {
						transform: "translate3d(0, 0, 0)",
					},
				},
				jello: {
					"from, 11.1%,to": {
						transform: "translate3d(0, 0, 0)",
					},
					"22.2%": {
						transform: "skewX(-12.5deg) skewY(-12.5deg)",
					},
					"33.3%": {
						transform: "skewX(6.25deg) skewY(6.25deg)",
					},
					"44.4%": {
						transform: "skewX(-3.125deg) skewY(-3.125deg)",
					},
					"55.5%": {
						transform: "skewX(1.5625deg) skewY(1.5625deg)",
					},
					"66.6%": {
						transform: "skewX(-0.78125deg) skewY(-0.78125deg)",
					},
					"77.7%": {
						transform: "skewX(0.390625deg) skewY(0.390625deg)",
					},
					"88.8%": {
						transform: "skewX(-0.1953125deg) skewY(-0.1953125deg)",
					},
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"spin-slow": "spin 6s linear infinite",
				wiggle: "wiggle 1s ease-in-out infinite",
				"heart-beat": "heartBeat 1s infinite",
				hflip: "flipHorizontal 2s infinite",
				vflip: "flipVertical 2s infinite",
				swing: "swing 2s ease-out infinite",
				"rubber-band": "rubberBand 1s infinite",
				flash: "flash 2s infinite",
				"head-shake": "headShake 2s infinite",
				wobble: "wobble 1s infinite",
				jello: "jello 2s infinite",
			},
		},
	},
	plugins: [
		require("tailwindcss-animate"),
		require("tailwindcss/plugin")(({ addComponents, theme }) => {
			addComponents([
				{
					h1: {
						fontFamily: theme("fontFamily.display"),
						fontSize: theme("fontSize.6xl"),
						lineHeight: theme("lineHeight.6xl"),
						marginTop: "0.23rem",
						marginBottom: "0.67rem",
					},
					h2: {
						fontFamily: theme("fontFamily.display"),
						fontSize: theme("fontSize.4xl"),
						lineHeight: theme("lineHeight.4xl"),
						marginTop: "-0.3rem",
						marginBottom: "-0.06rem",
					},
					h3: {
						fontFamily: theme("fontFamily.display"),
						fontSize: theme("fontSize.2xl"),
						lineHeight: theme("lineHeight.2xl"),
						marginTop: "-0.25rem",
						marginBottom: "-0.13rem",
					},
					h4: {
						fontFamily: theme("fontFamily.display"),
						fontSize: theme("fontSize.xl"),
						lineHeight: theme("lineHeight.xl"),
						marginTop: "-0.2rem",
						marginBottom: "-0.15rem",
					},
					h5: {
						fontFamily: theme("fontFamily.display"),
						fontSize: theme("fontSize.lg"),
						lineHeight: theme("lineHeight.lg"),
						marginTop: "-0.3rem",
						marginBottom: "-0.2rem",
					},
					h6: {
						fontFamily: theme("fontFamily.body"),
						fontSize: theme("fontSize.md"),
						lineHeight: theme("lineHeight.md"),
						fontWeight: theme("fontWeight.normal"),
						marginTop: "-0.45rem",
						marginBottom: "-0.4rem",
					},
					p: {
						fontFamily: theme("fontFamily.body"),
						fontSize: theme("fontSize.md"),
						lineHeight: theme("lineHeight.md"),
						fontWeight: theme("fontWeight.normal"),
					},
					code: {
						fontFamily: theme("fontFamily.body"),
						fontSize: theme("fontSize.md"),
						lineHeight: theme("lineHeight.md"),
						fontWeight: theme("fontWeight.normal"),
					},
				},
				{
					"@media (min-width: 700px)": {
						h1: {
							fontFamily: theme("fontFamily.display"),
							fontSize: theme("fontSize.6xl"),
							lineHeight: theme("lineHeight.6xl"),
							marginTop: "0.23rem",
							marginBottom: "0.67rem",
						},
						h2: {
							fontFamily: theme("fontFamily.display"),
							fontSize: theme("fontSize.4xl"),
							lineHeight: theme("lineHeight.4xl"),
							marginTop: "-0.3rem",
							marginBottom: "-0.06rem",
						},
						h3: {
							fontFamily: theme("fontFamily.display"),
							fontSize: theme("fontSize.2xl"),
							lineHeight: theme("lineHeight.2xl"),
							marginTop: "-0.25rem",
							marginBottom: "-0.13rem",
						},
						h4: {
							fontFamily: theme("fontFamily.display"),
							fontSize: theme("fontSize.xl"),
							lineHeight: theme("lineHeight.xl"),
							marginTop: "-0.2rem",
							marginBottom: "-0.15rem",
						},
						h5: {
							fontFamily: theme("fontFamily.display"),
							fontSize: theme("fontSize.lg"),
							lineHeight: theme("lineHeight.lg"),
							marginTop: "-0.3rem",
							marginBottom: "-0.2rem",
						},
						h6: {
							fontFamily: theme("fontFamily.body"),
							fontSize: theme("fontSize.md"),
							lineHeight: theme("lineHeight.md"),
							fontWeight: theme("fontWeight.normal"),
							marginTop: "-0.45rem",
							marginBottom: "-0.4rem",
						},
						p: {
							fontFamily: theme("fontFamily.body"),
							fontSize: theme("fontSize.md"),
							lineHeight: theme("lineHeight.md"),
							fontWeight: theme("fontWeight.normal"),
							marginTop: "-0.45rem",
							marginBottom: "-0.4rem",
						},
						code: {
							fontFamily: theme("fontFamily.body"),
							fontSize: theme("fontSize.md"),
							lineHeight: theme("lineHeight.md"),
							fontWeight: theme("fontWeight.normal"),
							marginTop: "-0.45rem",
							marginBottom: "-0.4rem",
						},
					},
				},
				{
					"@media (min-width: 1000px)": {
						h1: {
							fontFamily: theme("fontFamily.display"),
							fontSize: theme("fontSize.6xl"),
							lineHeight: theme("lineHeight.6xl"),
							marginTop: "0.23rem",
							marginBottom: "0.67rem",
						},
						h2: {
							fontFamily: theme("fontFamily.display"),
							fontSize: theme("fontSize.4xl"),
							lineHeight: theme("lineHeight.4xl"),
							marginTop: "-0.3rem",
							marginBottom: "-0.06rem",
						},
						h3: {
							fontFamily: theme("fontFamily.display"),
							fontSize: theme("fontSize.2xl"),
							lineHeight: theme("lineHeight.2xl"),
							marginTop: "-0.25rem",
							marginBottom: "-0.13rem",
						},
						h4: {
							fontFamily: theme("fontFamily.display"),
							fontSize: theme("fontSize.xl"),
							lineHeight: theme("lineHeight.xl"),
							marginTop: "-0.2rem",
							marginBottom: "-0.15rem",
						},
						h5: {
							fontFamily: theme("fontFamily.display"),
							fontSize: theme("fontSize.lg"),
							lineHeight: theme("lineHeight.lg"),
							marginTop: "-0.3rem",
							marginBottom: "-0.2rem",
						},
						h6: {
							fontFamily: theme("fontFamily.body"),
							fontSize: theme("fontSize.md"),
							lineHeight: theme("lineHeight.md"),
							fontWeight: theme("fontWeight.normal"),
							marginTop: "-0.45rem",
							marginBottom: "-0.4rem",
						},
						p: {
							fontFamily: theme("fontFamily.body"),
							fontSize: theme("fontSize.md"),
							lineHeight: theme("lineHeight.md"),
							fontWeight: theme("fontWeight.normal"),
							marginTop: "-0.45rem",
							marginBottom: "-0.4rem",
						},
						code: {
							fontFamily: theme("fontFamily.body"),
							fontSize: theme("fontSize.md"),
							lineHeight: theme("lineHeight.md"),
							fontWeight: theme("fontWeight.normal"),
							marginTop: "-0.45rem",
							marginBottom: "-0.4rem",
						},
					},
				},
				{
					"@media (min-width: 1400px)": {
						h1: {
							fontFamily: theme("fontFamily.display"),
							fontSize: theme("fontSize.8xl"),
							lineHeight: "7.6rem",
							marginTop: "-0.6rem",
							marginBottom: "0.4rem",
						},
						h2: {
							fontFamily: theme("fontFamily.display"),
							fontSize: theme("fontSize.5xl"),
							lineHeight: theme("lineHeight.5xl"),
							marginTop: "-0.3rem",
							marginBottom: "0rem",
						},
						h3: {
							fontFamily: theme("fontFamily.display"),
							fontSize: theme("fontSize.3xl"),
							lineHeight: theme("lineHeight.3xl"),
							marginTop: "-0.2rem",
							marginBottom: "-0.1rem",
						},
						h4: {
							fontFamily: theme("fontFamily.display"),
							fontSize: theme("fontSize.2xl"),
							lineHeight: theme("lineHeight.2xl"),
							marginTop: "-0.2rem",
							marginBottom: "-0.1rem",
						},
						h5: {
							fontFamily: theme("fontFamily.display"),
							fontSize: theme("fontSize.xl"),
							lineHeight: theme("lineHeight.xl"),
							marginTop: "-0.2rem",
							marginBottom: "-0.2rem",
						},
						h6: {
							fontFamily: theme("fontFamily.body"),
							fontSize: theme("fontSize.lg"),
							lineHeight: theme("lineHeight.lg"),
							fontWeight: theme("fontWeight.normal"),
							marginTop: "-0.2rem",
							marginBottom: "-0.2rem",
						},
						code: {
							fontFamily: theme("fontFamily.body"),
							fontSize: theme("fontSize.md"),
							lineHeight: theme("lineHeight.md"),
							fontWeight: theme("fontWeight.normal"),
							marginTop: "-0.45rem",
							marginBottom: "-0.4rem",
						},
					},
				},
			]);
		}),
	],
};
