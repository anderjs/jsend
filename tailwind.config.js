import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./public/**/*.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./dist/**/*.{js,ts,jsx,tsx}",

  ],
  theme: {
    extend: {
      padding: {
        bxs: "0.4375rem, 0.6875rem, 0.4375rem, 0.6875rem",
        bsm: "0.5625rem, 0.8125rem, 0.5625rem, 0.8125rem",
        bmd: "0.5625rem, 1.0625rem, 0.5625rem, 1.0625rem",
        blg: "0.5625rem, 1.25rem, 0.5625rem, 1.25rem",
        bxl: "0.8125rem, 1.25rem, 0.8125rem, 1.25rem",
      },
      width: {
        bxs: "5.125rem",
        bsm: "5.9375rem",
        bmd: "6.4375rem",
        blg: "7.4375rem",
        bxl: "10.0625rem",
      },
      borderColor: {
        secondary: "#65BFB1",
      },
      textColor: {
        contained: "#FFFFFF",
        outlined: "#65BFB1",
      },
      colors: {
        app: "#F3F3F3",
        info: "#939799",
        danger: "#E55257",
        success: "#9AC873",
        primary: "#316772",
        warning: "#F1A946",
        quinary: "#F5C37E",
        secondary: "#65BFB1",
        disabled: "#F3F3F3",
        darkened: "#464646",
        opaque: '#DFDFDF',
        
      },
      backgroundColor: {
        app: "#F3F3F3",
        tertiary: "#FFFF",
        info: "#939799",
        danger: "#E55257",
        success: "#9AC873",
        primary: "#316772",
        warning: "#F1A946",
        quinary: "#F5C37E",
        secondary: "#65BFB1",
        disabled: "#F3F3F3",
        darkened: "#464646",
        opaque: '#DFDFDF'
      },
      fontFamily: {
        sans: ["Roboto", ...defaultTheme.fontFamily.sans],
      },
      transitionProperty: {
        height: "height",
        opacity: "opacity",
      },
      transitionDuration: {
        default: "250ms",
        300: "300ms",
        500: "500ms",
      },
      transitionTimingFunction: {
        "ease-in": "ease-in",
        "ease-out": "ease-out",
      },
    },
    transitionDelay: {
      default: "0ms",
      100: "100ms",
      250: "250ms",
    },
  },
  plugins: [],
}

