/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',

  ],
  theme: {
    extend: {
      screens: {
        '2xl': '1920px',
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),

  ],


}

