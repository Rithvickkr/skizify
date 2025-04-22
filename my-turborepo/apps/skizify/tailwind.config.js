
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";

import { content as _content, plugin } from "flowbite-react/tailwind";

/** Plugin to add CSS variables for all colors */
function addVariablesForColors({ addBase, theme }) {
	const allColors = flattenColorPalette(theme("colors"));
	const newVars = Object.fromEntries(
		Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
	);
	addBase({ ":root": newVars });
}

/** @type {import('tailwindcss').Config} */
export const content = [
	"./app/**/*.{js,ts,jsx,tsx,mdx}",
	"./pages/**/*.{js,ts,jsx,tsx,mdx}",
	"./components/**/*.{js,ts,jsx,tsx,mdx}",
	"./@/components/**/*.{js,ts,jsx,tsx,mdx}",
	
	"./@/components/ui/**/*.{js,ts,jsx,tsx,mdx}",
	"./src/**/*.{ts,tsx}",
	"!../../node_modules/**",
	_content(),
];
export const darkMode = ["class"];
export const theme = {
	fontFamily: {
		display: ["Archivo"],
		time: ["Libre Franklin", "sans-serif"],
		helvetica: ["Helvetica", "Arial", "sans-serif"],
		inter: ["Inter", "sans-serif"],
	},
	extend: {
		colors: {
			themeblue: "#020817",
			lightwhite: "#cfcfcf",
			lightdark: "#353535",
			mediumdark: "#1c1c1c",
			v0dark: "#212125",
			lumadark: "#131617",
		},
		backgroundImage: {
			"trail-blue":
				"radial-gradient(circle, rgba(7,0,38,0.929030987394958) 36%, rgba(0,0,0,1) 88%)",
			spotlight:
				"linear-gradient(270deg, rgba(32,39,87,1) 31%, rgba(0,0,0,1) 88%)",
		},
		screens: {
			"3xl": "1920px",
			"4xl": "2100px",
		},
		animation: {
			"border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
			shine: "shine var(--duration) infinite linear",
			spotlight: "spotlight 2s ease .75s 1 forwards",
			spin: 'spin 20s linear infinite',
			'spin-reverse': 'spin 20s linear infinite reverse',	

		},
		keyframes: {
			"border-beam": {
				"100%": { "offset-distance": "100%" },
			},
			shine: {
				"0%": { "background-position": "0% 0%" },
				"50%": { "background-position": "100% 100%" },
				to: { "background-position": "0% 0%" },
			},
			spotlight: {
				"0%": {
				  opacity: 0,
				  transform: "translate(-72%, -62%) scale(0.5)",
				},
				"100%": {
				  opacity: 1,
				  transform: "translate(-50%,-40%) scale(1)",
				},
			  },	  
		},
	},
};







export const plugins = [
	plugin(),
	require("tailwindcss-textshadow"),
	addVariablesForColors,
];
export const extend = {
	keyframes: {
		shine: {
			from: { backgroundPosition: "200% 0" },
			to: { backgroundPosition: "-200% 0" },
		},
	},
	animation: {
		shine: "shine 8s ease-in-out infinite",
	},
};