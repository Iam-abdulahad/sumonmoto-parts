/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-background": "url('/Images/bg.jpg')",
        "footer-background": "url('/Images/footer.jpg')",
      },
      blur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
