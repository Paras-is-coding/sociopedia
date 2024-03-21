/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customDark: '#1F2937',
      },
    },
  },
  plugins: [
    // Use require syntax for adding Tailwind CSS plugins
    require('@tailwindcss/forms'),
  ],
}


