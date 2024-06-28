/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
      extend: {
          colors: {
              primary: '#227c9d',
              secondary: '#17c3b2',
              accent: '#ffcb77',
              light: '#fef9ef',
              dark: '#fe6d73',
          },
      },
      fontFamily: {
          sans: ['Nunito', 'sans-serif'],
      },
  },
  variants: {},
  plugins: [],
};
