import { extendTheme } from '@chakra-ui/react';

const customTheme = extendTheme({
    colors: {
        main: {
            blue: '#0077FF',
            'blue.hover': '#4299E1',
            'light.blue.hover': '#EBF8FF',
        },
    },
    fonts: {},
    fontSizes: {},
    breakpoints: {
        sm: '320px',
        md: '768px',
        lg: '960px',
        xl: '1200px',
    },
});

export default customTheme;
