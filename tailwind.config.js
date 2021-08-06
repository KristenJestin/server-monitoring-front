const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

const { lightBlue, ...allColors } = colors

module.exports = {
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                sans: ['Poppins', ...defaultTheme.fontFamily.sans],
                header: ['Montserrat', ...defaultTheme.fontFamily.sans],
            },
        },
        colors: {
            // ...allColors,
            white: allColors.white,
            gray: allColors.coolGray,
            red: allColors.red,
            green: allColors.green,
            primary: colors.purple,
            secondary: colors.blue,
            neutral: colors.gray,
            transparent: 'transparent',
        },
    },
    variants: {
        extend: {
            borderWidth: ['first'],
            display: ['group-hover'],
            margin: ['last'],
        },
    },
    plugins: [],
}
