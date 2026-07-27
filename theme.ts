// theme.ts
'use client';

import { extendTheme } from '@mui/material/styles';

const theme = extendTheme({
    colorSchemes: {
        dark: {
            palette: {
                primary: {
                    main: '#3b82f6', // Vibrant blue
                },
                secondary: {
                    main: '#ec4899', // Vibrant pink/magenta
                },
                background: {
                    default: '#09090b', // Deep zinc/near-black background
                    paper: '#18181b', // Slightly lighter surface color for cards & navigation
                },
                text: {
                    primary: '#f4f4f5', // High-contrast clean white text
                    secondary: '#a1a1aa', // Muted gray text for subtitles/labels
                },
            },
        },
        light: {
            palette: {
                primary: {
                    main: '#2563eb',
                },
                secondary: {
                    main: '#db2777',
                },
                background: {
                    default: '#fafafa',
                    paper: '#ffffff',
                },
            },
        },
    },
    components: {
        MuiButton: {
            defaultProps: {
                variant: 'outlined',
            },
        },
        MuiTextField: {
            defaultProps: {
                slotProps: {
                    htmlInput: {
                        autoComplete: 'off',
                    },
                },
            },
        },
    },
});

export default theme;
