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

    },

    extend: {
      colors : {
        themeblue : '#020817'
      },
      backgroundImage: {
        "trail-blue" : "radial-gradient(circle, rgba(7,0,38,0.929030987394958) 36%, rgba(0,0,0,1) 88%)"
      },
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