/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-background": "url('./src/assets/bg.jpg')",
        "footer-background": "url('./src/assets/footer.jpg')",
      },
      blur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
