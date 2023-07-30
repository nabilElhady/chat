/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      /* Add your custom utility class using the @layer directive */
      "@layer utilities": {
        ".my-child-style": {
          "@apply bg-gray-200 h-16 w-16 rounded-full p-4": {},
        },
      },
    },
  },
  plugins: [],
};
