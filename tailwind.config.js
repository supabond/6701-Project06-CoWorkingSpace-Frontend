/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    "text-orange-700",
    "outline-orange-500",
    "text-orange-500",
    "text-orange-700",
    "text-orange-600",
    "bg-orange-500",
    "border-orange-500",
    "hover:text-orange-500",
    "hover:bg-orange-600",
    "outline-orange-500",
    "text-blue-700",
    "text-blue-900",
    "text-blue-800",
    "bg-blue-700",
    "border-blue-700",
    "hover:text-blue-700",
    "hover:bg-blue-800",
    "outline-blue-700",
  ]
}

