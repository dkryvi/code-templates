module.exports = {
  darkMode: 'class',
  purge: {
    enabled: true,
    content: ['./components/**/*.tsx', './pages/**/*.tsx'],
    options: {
      safelist: ['dark'] //specific classes
    }
  },
  plugins: [require('@tailwindcss/typography')],
  theme: {
    extend: {
      colors: {
        'accent-1': '#FAFAFA',
        'accent-2': '#EAEAEA'
      },
      fontSize: {
        '5xl': '2.5rem',
        '6xl': '2.75rem',
        '7xl': '4.5rem',
        '8xl': '6.25rem'
      },
      letterSpacing: {
        tighter: '-.04em'
      },
      lineHeight: {
        tight: 1.2
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.900')
          }
        }
      })
    }
  }
}
