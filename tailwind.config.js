/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-bg":
          "url('https://png.pngtree.com/thumb_back/fh260/background/20231225/pngtree-enchanting-summer-rainfall-creating-an-abstract-texture-in-the-forest-s-image_13854015.png')",
      },
    },
  },
  plugins: [],
};
