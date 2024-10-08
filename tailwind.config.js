/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");

module.exports = {
  content: [
    "./node_modules/flowbite-react/lib/**/*.js",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  darkMode: 'class', 
  theme: {
    extend: {
      colors: {
        primary: '#9c7e5e',
        'primary-dark': '#A3755F',
        'text-light': '#C39E76',
        'text-dark': '#A3755F',
        'bg-light': '#FFFFFF',
        'bg-dark': '#1F2937',
        'bg-dark-header': '#6d5841',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

    },
  },

  plugins: [[require("tw-elements/plugin.cjs")],
  flowbite.plugin(),
  ],
};
