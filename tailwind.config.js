module.exports = {
  darkMode: 'class',
  purge: {
    enabled: true,
    content: ['./components/**/*.tsx', './pages/**/*.tsx'],
    options: {
      safelist: ['dark'] //specific classes
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')
  ],
  theme: {
    extend: {
      colors: {
        'accent-2': '#EAEAEA',
        primary: {
          light: '#52c7b8',
          DEFAULT: '#009688',
          dark: '#00675b'
        },
        secondary: {
          light: '#8e8e8e',
          DEFAULT: '#616161',
          dark: '#373737'
        }
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
