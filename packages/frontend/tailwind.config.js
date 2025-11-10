/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Theme colors
        'background': '#000000',  // Black backgrounds
        'foreground': '#ffffff',  // White text
        'accent': '#ff6b35',      // Orange accents
        'muted': '#e5e5e5',       // Light grey text

        // Legacy brand colors (keeping for compatibility)
        'brand-orange': '#ff6b35',
        'brand-grey': '#e5e5e5',
        'brand-light-grey': '#f5f5f5',
      },
    },
  },
  plugins: [],
}