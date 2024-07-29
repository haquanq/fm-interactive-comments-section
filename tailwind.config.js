import plugin from "tailwindcss/plugin";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      tablet: "48em",

      "hover-support": { raw: "(hover: hover)" },
    },
    fontFamily: {},
    fontSize: {
      "heading-2": "1.5rem",
      body: "1rem",
      md: "1.0625rem",
    },
    lineHeight: {
      none: "1",
      paragraph: "1.5rem",
      heading: {
        2: "1.75rem",
      },
    },
    letterSpacing: {
      main: "-0.03em",
    },
    colors: {
      trasnparent: "transparent",
      red: {
        200: "var(--clr-red-200)",
        500: "var(--clr-red-500)",
      },
      blue: {
        900: "var(--clr-blue-900)",
        500: "var(--clr-blue-500)",
        200: "var(--clr-blue-200)",
        100: "var(--clr-blue-100)",
      },
      gray: {
        100: "var(--clr-gray-100)",
        50: "var(--clr-gray-50)",
      },
      white: "var(--clr-white)",
    },
    extend: {},
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("child-except-last", "& > *:not(:last-child)");
      addVariant("child-except-fist", "& > *:not(:first-child)");
    }),
  ],
};
