const {nextui, colors} = require('@nextui-org/theme');
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
      helvetica: ['Helvetica', 'Arial', 'sans-serif'],
    },

  extend: {
      colors : {
        themeblue : '#020817',
        lightwhite : "#cfcfcf",
        lightdark : "#353535",
        mediumdark : "#1c1c1c",
        v0dark: "#212125",
        lumadark : "#131617"
      },
      backgroundImage: {
        "trail-blue" : "radial-gradient(circle, rgba(7,0,38,0.929030987394958) 36%, rgba(0,0,0,1) 88%)",
        "spotlight" : "linear-gradient(270deg, rgba(32,39,87,1) 31%, rgba(0,0,0,1) 88%)"
      },
      screens : {
        '3xl': '1920px',
        '4xl': '2100px',
      }
    },
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
    }
},

}