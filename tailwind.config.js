module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}", "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          black: "#151921",
          grey: "#1B262C",
          blue: "#24507b",
          white: "#F6FBF4",
          white2: "#DDDDDD",
        },
        secondary: {
          blue: "#3282B8",
          red: "#D91E11",
          yellow: "#FDBB2E",
        },
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
