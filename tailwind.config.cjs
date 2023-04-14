// eslint-disable-next-line @typescript-eslint/no-var-requires
const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html, js, jsx, ts,tsx}"],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  future: {
    hoverOnlyWhenSupported: true
  },
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        xs: "480px",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans]
      },
      fontSize: {
        '2xs': '0.75rem',
        xs: '0.875rem',
        sm: '1rem',
        base: ['1.125rem'],
        lg: '1.25rem',
        xl: '1.5rem',
        '2xl': '1.875rem',
        '3xl': '2.25rem',
        '4xl': '3rem',
        '5xl': '4rem',
        '6xl': '5rem',
      },
    },
  },
  plugins: [],
}
