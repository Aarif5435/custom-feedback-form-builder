import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'emoji-gray': '#D1D5DB',
      },
      scale: {
        '110': '1.1',
      },
      scrollbar: {
        width: '8px',
        thumbColor: '#5578F4',
        trackColor: '#F1F1F1',
      },
    },
  },
  variants: {
    extend: {
      scale: ['hover'], 
      brightness: ['hover'],
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
};
export default config;
