const {nextui} = require('@nextui-org/theme');
const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./@/components/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./@/components/ui/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
    // "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily:{
      'display': ['Archivo'],
      time : ['"Libre Franklin"', 'sans-serif'],

    },

    extend: {},
  },
  darkMode: "class",
  plugins: [nextui(),flowbite.plugin(),
        require('tailwindcss-textshadow'),
  ],
  extend: {
    keyframes: {
      "shine": {
        from: { backgroundPosition: '200% 0' },
        to: { backgroundPosition: '-200% 0' },
      },
    },
    animation: {
      "shine": "shine 8s ease-in-out infinite",
    },
},

}