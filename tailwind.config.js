/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFD700', // Pikachu geel
        secondary: '#3B4CCA', // Pokémon blauw
        accent: '#FF0000', // Pokémon rood
        background: '#F5F5F5',
        success: '#4CAF50',
        error: '#F44336',
        warning: '#FF9800',
      },
      scale: {
        '105': '1.05',
      },
      transitionProperty: {
        'height': 'height',
      },
    },
  },
  safelist: [
    'bg-blue-200',
    'bg-green-200',
    'bg-gray-200',
    'border-blue-500',
    'border-green-500',
    'border-gray-500',
    'text-blue-800',
    'text-green-800',
    'text-gray-800',
  ],
  plugins: [],
}; 