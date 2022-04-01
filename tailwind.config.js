const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.js',
    ],

    theme: {
        extend: {
            colors: {
                'indigo': colors.indigo,
                'blud': colors.blue,
                'ungu': {
                    50:  '#F7EBFD',
                    100: '#D283FF',
                    200: '#BD68EE',
                    300: '#AB51E3',
                    400: '#8B2FC9',
                    500: '#6818A5',
                    600: '#5A108F',
                    700: '#4A0A77',
                    800: '#3C0663',
                    900: '#310055',
                },
                'jingga': {
                    100: '#FF9E00',
                    200: '#FF9100',
                    300: '#FF8500',
                    400: '#FF7900',
                    500: '#FF6D00',
                }
            },
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [
        require('@tailwindcss/forms'),
        require('tailwind-scrollbar'),
    ],
};
