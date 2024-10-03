// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Ensure all your source files are included
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'Roboto', 'sans-serif'], // Set Poppins and Roboto as the primary fonts
      },
    },
  },
  plugins: [],
};
