/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'spotlight': '#FFD700',
        'stage': '#1a1a2e',
        'accent': '#e94560',
      },
    },
  },
  plugins: [],
}


