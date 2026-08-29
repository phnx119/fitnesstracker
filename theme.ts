// theme.ts
'use client';

import { createTheme, ThemeOptions } from '@mui/material/styles';

// 1. TypeScript Augmentation: Adds type safety for theme.chart
declare module '@mui/material/styles' {
    interface Theme {
        chart: {
            set1: string;
            set2: string;
            set3: string;
            fadeBackground: string;
        };
    }
    interface ThemeOptions {
        chart?: {
            set1?: string;
            set2?: string;
            set3?: string;
            fadeBackground?: string;
        };
    }
}

// 2. Base Component Overrides applied across all themes
const baseComponentOverrides: ThemeOptions['components'] = {
    MuiButton: {
        defaultProps: {
            variant: 'outlined',
        },
    },
    MuiTextField: {
        defaultProps: {
            type: 'search',
            slotProps: {
                htmlInput: {
                    autoComplete: 'off',
                    enterKeyHint: 'done',
                },
            },
        },
    },
    MuiDialog: {
        defaultProps: {
            fullWidth: true,
        },
    },
};

// 3. Theme Presets with Palette & MachineChart Colors
export const THEMES = {
    dark: {
        name: 'Dark (Default)',
        palette: {
            mode: 'dark' as const,
            primary: { main: '#3b82f6' },
            secondary: { main: '#ec4899' },
            background: { default: '#09090b', paper: '#18181b' },
            text: { primary: '#f4f4f5', secondary: '#a1a1aa' },
        },
        chart: {
            set1: '#00e676', // Vibrant Green
            set2: '#29b6f6', // Light Blue
            set3: '#ff1744', // Red
            fadeBackground:
                'linear-gradient(0deg, rgba(255, 23, 68, 0) 0%, rgba(154, 154, 154, 0.35) 100%)',
        },
    },
    light: {
        name: 'Light',
        palette: {
            mode: 'light' as const,
            primary: { main: '#2563eb' },
            secondary: { main: '#db2777' },
            background: { default: '#fafafa', paper: '#ffffff' },
            text: { primary: '#18181b', secondary: '#71717a' },
        },
        chart: {
            set1: '#16a34a',
            set2: '#0284c7',
            set3: '#dc2626',
            fadeBackground:
                'linear-gradient(0deg, rgba(220, 38, 38, 0) 0%, rgba(0, 0, 0, 0.08) 100%)',
        },
    },
    cyberpunk: {
        name: 'Cyberpunk',
        palette: {
            mode: 'dark' as const,
            primary: { main: '#00ffcc' },
            secondary: { main: '#ff007f' },
            background: { default: '#0d0221', paper: '#190a3a' },
            text: { primary: '#ffffff', secondary: '#00ffcc' },
        },
        chart: {
            set1: '#00ffcc', // Neon Cyan
            set2: '#ffe600', // Neon Yellow
            set3: '#ff007f', // Neon Pink
            fadeBackground:
                'linear-gradient(0deg, rgba(25, 10, 58, 0) 0%, rgba(255, 0, 127, 0.25) 100%)',
        },
    },
    forest: {
        name: 'Forest',
        palette: {
            mode: 'dark' as const,
            primary: { main: '#4ade80' },
            secondary: { main: '#a3e635' },
            background: { default: '#052e16', paper: '#064e3b' },
            text: { primary: '#f0fdf4', secondary: '#86efac' },
        },
        chart: {
            set1: '#4ade80', // Emerald Green
            set2: '#facc15', // Amber / Sun Yellow
            set3: '#fb923c', // Orange
            fadeBackground:
                'linear-gradient(0deg, rgba(5, 46, 22, 0) 0%, rgba(74, 222, 128, 0.2) 100%)',
        },
    },
    midnight: {
        name: 'Midnight Dracula',
        palette: {
            mode: 'dark' as const,
            primary: { main: '#bd93f9' },
            secondary: { main: '#ff79c6' },
            background: { default: '#282a36', paper: '#44475a' },
            text: { primary: '#f8f8f2', secondary: '#6272a4' },
        },
        chart: {
            set1: '#50fa7b', // Dracula Green
            set2: '#8be9fd', // Dracula Cyan
            set3: '#ff5555', // Dracula Red
            fadeBackground:
                'linear-gradient(0deg, rgba(40, 42, 54, 0) 0%, rgba(189, 147, 249, 0.25) 100%)',
        },
    },
} as const;

export type ThemeKey = keyof typeof THEMES;

export function createAppTheme(themeKey: string) {
    const selected = THEMES[themeKey as ThemeKey] || THEMES.dark;

    return createTheme({
        palette: selected.palette,
        chart: selected.chart,
        components: baseComponentOverrides,
    });
}

const defaultTheme = createAppTheme('dark');
export default defaultTheme;
