import { extendTheme } from '@chakra-ui/react';

const customTheme = extendTheme({
    colors: {
        main: {
            'bg.primary': '#f9fafb',
            'bg.sec': '#e5e7eb',
            text: '#111827',
            'text.white': 'RGBA(255, 255, 255, 0.95)',
            blue: '#0077FF',
            'blue.hover': '#4299E1',
            'light.blue.hover': '#EBF8FF',
            indigo: '#5453E0',
            placeholder: '#e5e7eb',
            'input-bg': '#262626',
            success: '#20BD5F',
            danger: '#f44336',
        },
    },
    fonts: {
        body: `'Nunito' , -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
    },
    fontSizes: {},
    breakpoints: {
        ssm: '0px',
        sm: '400px',
        md: '768px',
        lg: '960px',
        xl: '1200px',
    },
});

export default customTheme;
