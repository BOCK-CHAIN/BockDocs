/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          primary: '#3B82F6',
        },
        typography: (theme) => ({
          DEFAULT: {
            css: {
              color: theme('colors.gray.900'),
              a: {
                color: theme('colors.blue.600'),
                '&:hover': {
                  color: theme('colors.blue.700'),
                },
              },
            },
          },
          dark: {
            css: {
              color: theme('colors.gray.100'),
              a: {
                color: theme('colors.blue.400'),
                '&:hover': {
                  color: theme('colors.blue.300'),
                },
              },
            },
          },
        }),
        fontSize: {
          'sm': '0.875rem',
          'base': '1rem',
          'lg': '1.125rem',
          'xl': '1.25rem',
          '2xl': '1.5rem',
        },
      },
    },
    plugins: [
      require('@tailwindcss/typography'),
    ],
  }
  