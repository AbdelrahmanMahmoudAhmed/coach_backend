import type { Config } from "tailwindcss";

const config: Config = {

  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
        lineHeight: {
          'custom': '25.6px',
        },
      boxShadow: {
        '3xl': '1px 3px 7px rgb(0 0 0 / 15%)',
        '4xl': '0px -6px 6px rgb(0 0 0 / 16%)',
        'slider' : '5px -7px 3px rgb(0 0 0 / 10%)',
        '5xl' : '5px -7px 3px  rgb(47 163 247 / 10%)',
      },
      colors: {
        'primary': '#FF6B00',
        'secondary': '#3a73ef',
        'third': '#B6AAAA',
        'fourth':"#79767D",
        'dark-bg':"#121212",
        'light-bg':"#fff",
    },
      screens: {
        '3xl': '2400px',
        'xs':"400px"
      },
    },
  },
  plugins: [],
};
export default config;
