module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: [
        "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial",
        "sans-serif",
      ],
    },
    fontSize: {
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
      sm: "16px",
      base: "20px",
      lg: "24px",
    },
    screens: {
      sm: "500px",
      md: "1005px",
      lg: "1281px",
      xl: "1440px",
    },
    colors: {
      transparent: 'transparent',
      white: '#ffffff',
      blue: '#1da1f2',
      'blue-dark': '#1a91da',
      text: {
        primary: '#0f1419',
        secondary: '#5b7083',
      },
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
