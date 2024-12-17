/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      'primary': "#FF0000",
      'primaryDark': "#FF0101",
      'secondary': "#000000",
      'tertiary': "#74798C",
      'quaternary': "#FFFFFF",
      'proteins': "#4AB8FF",
      'calories': "#FF0000",
      'glucids': "#F9CE23",
      'lipids': "#FD5181",
    },
    fontFamily: {
      roboto: ["Roboto", "sans-serif"],
    },
  },
  plugins: [],
}

