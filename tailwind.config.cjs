/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./main.js",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#FF3B30",
        "light-gray": "#EDF0F7",
        "dark-grey": "#4A5468",
        "low-dark-grey": "#E2E7F0"
      },
      backgroundColor: {
        "background-gray": "#F9FAFC",
      },
      width: {
        "el-without-padding": "calc(100% - 1.5rem)",
      },
      height: {
        "140": "35rem"
      }
    },
    fontSize: {
         "13": "13px",
         "16": "16px",
    }
  },
  plugins: [],
}
