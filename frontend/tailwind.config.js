module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: [
        "Montserrat",
        "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial",
        "sans-serif",
      ],
    },
    fontSize: {
      xs: "0.75rem",
      sm: "14px",
      base: "16px",
      lg: "20px",
    },
    fontWeight: {
      regular: 400,
      medium: 600,
      bold: 700,
      xbold: 800,
    },
    lineHeight: {
      xs: "1rem",
      sm: "16px",
      base: "20px",
      lg: "24px",
    },
    colors: {
      transparent: "transparent",
      white: "#ffffff",
      blue: "#1947E5",
      pink: "#FF89BB",
      yellow: "#FFBD12",
      green: "#00C6AE",
      red: "#F95A2C",
      text: {
        primary: "#18191F",
        secondary: "#474A57",
      },
    },
    boxShadow: {
      sm: "0 3px black",
      DEFAULT: "0 8px black",
    },
    extend: {
      fontSize: {
        "3xl": "3rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
