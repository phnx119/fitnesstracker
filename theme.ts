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

export const THEMES = {
    // 1. Default MUI (Official MUI Dark baseline)
    defaultMui: {
        name: 'Default',
        palette: {
            mode: 'dark' as const,
            primary: { main: '#90caf9' },
            secondary: { main: '#ce93d8' },
            background: {
                default: '#121212',
                paper: '#1e1e1e',
            },
            text: {
                primary: '#ffffff',
                secondary: 'rgba(255, 255, 255, 0.7)',
            },
            divider: 'rgba(255, 255, 255, 0.12)',
        },
        chart: {
            set1: '#90caf9',
            set2: '#ce93d8',
            set3: '#f48fb1',
            fadeBackground:
                'linear-gradient(180deg, rgba(144, 202, 249, 0.15) 0%, rgba(0, 0, 0, 0) 100%)',
        },
    },

    // 2. Pure Black Monochrome
    monochrome: {
        name: 'Monochrome',
        palette: {
            mode: 'dark' as const,
            primary: { main: '#ffffff' },
            secondary: { main: '#a1a1aa' },
            background: {
                default: '#000000',
                paper: '#121212',
            },
            text: {
                primary: '#ffffff',
                secondary: '#a1a1aa',
            },
            divider: '#27272a',
        },
        chart: {
            set1: '#ffffff',
            set2: '#a1a1aa',
            set3: '#52525b',
            fadeBackground:
                'linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(0, 0, 0, 0) 100%)',
        },
    },

    // 3. Absolute Zero Monochrome (Maximum pure black surfaces)
    monochromeHardcore: {
        name: 'Monochrome Pro Max',
        palette: {
            mode: 'dark' as const,
            primary: { main: '#ffffff' },
            secondary: { main: '#71717a' },
            background: {
                default: '#000000',
                paper: '#000000',
            },
            text: {
                primary: '#ffffff',
                secondary: '#71717a',
            },
            divider: '#3f3f46',
        },
        chart: {
            set1: '#3edf64',
            set2: '#edeb6e',
            set3: '#fc8744',
            fadeBackground:
                'linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(0, 0, 0, 0) 100%)',
        },
    },

    // 4. Crimson Slate (Red Accent)
    crimsonSlate: {
        name: 'Crimson Slate',
        palette: {
            mode: 'dark' as const,
            primary: { main: '#ef4444' },
            secondary: { main: '#f87171' },
            background: {
                default: '#0f0a0a',
                paper: '#1a1212',
            },
            text: {
                primary: '#fef2f2',
                secondary: '#a89a9a',
            },
            divider: 'rgba(239, 68, 68, 0.16)',
        },
        chart: {
            set1: '#ef4444',
            set2: '#f97316',
            set3: '#fbbf24',
            fadeBackground:
                'linear-gradient(180deg, rgba(239, 68, 68, 0.12) 0%, rgba(0, 0, 0, 0) 100%)',
        },
    },

    // 5. Emerald Forest (Green Accent)
    emeraldForest: {
        name: 'Der Grüne',
        palette: {
            mode: 'dark' as const,
            primary: { main: '#10b981' },
            secondary: { main: '#34d399' },
            background: {
                default: '#06120e',
                paper: '#0f1f19',
            },
            text: {
                primary: '#ecfdf5',
                secondary: '#869e94',
            },
            divider: 'rgba(16, 185, 129, 0.16)',
        },
        chart: {
            set1: '#10b981',
            set2: '#06b6d4',
            set3: '#3b82f6',
            fadeBackground:
                'linear-gradient(180deg, rgba(16, 185, 129, 0.12) 0%, rgba(0, 0, 0, 0) 100%)',
        },
    },

    // 6. Midnight Sapphire (Blue Accent)
    midnightSapphire: {
        name: 'Nass',
        palette: {
            mode: 'dark' as const,
            primary: { main: '#3b82f6' },
            secondary: { main: '#60a5fa' },
            background: {
                default: '#070d19',
                paper: '#0f172a',
            },
            text: {
                primary: '#eff6ff',
                secondary: '#94a3b8',
            },
            divider: 'rgba(59, 130, 246, 0.16)',
        },
        chart: {
            set1: '#3b82f6',
            set2: '#8b5cf6',
            set3: '#06b6d4',
            fadeBackground:
                'linear-gradient(180deg, rgba(59, 130, 246, 0.12) 0%, rgba(0, 0, 0, 0) 100%)',
        },
    },

    // 7. Amber Gold (Yellow/Gold Accent)
    amberGold: {
        name: 'Amber Gold',
        palette: {
            mode: 'dark' as const,
            primary: { main: '#eab308' },
            secondary: { main: '#fde047' },
            background: {
                default: '#121006',
                paper: '#1f1b0b',
            },
            text: {
                primary: '#fefce8',
                secondary: '#a39e85',
            },
            divider: 'rgba(234, 179, 8, 0.16)',
        },
        chart: {
            set1: '#eab308',
            set2: '#f97316',
            set3: '#84cc16',
            fadeBackground:
                'linear-gradient(180deg, rgba(234, 179, 8, 0.12) 0%, rgba(0, 0, 0, 0) 100%)',
        },
    },

    // 8. Ultra Light (Very Bright Light Mode)
    ultraLight: {
        name: 'FLASHBANG',
        palette: {
            mode: 'light' as const,
            primary: { main: '#2563eb' },
            secondary: { main: '#4f46e5' },
            background: {
                default: '#ffffff',
                paper: '#f8fafc',
            },
            text: {
                primary: '#0f172a',
                secondary: '#64748b',
            },
            divider: '#e2e8f0',
        },
        chart: {
            set1: '#2563eb',
            set2: '#10b981',
            set3: '#f59e0b',
            fadeBackground:
                'linear-gradient(180deg, rgba(37, 99, 235, 0.10) 0%, rgba(255, 255, 255, 0) 100%)',
        },
    },

    // 9. Cyberpunk (Neon Yellow & Cyan over Dark Violet)
    cyberpunk: {
        name: 'Cyberpunk',
        palette: {
            mode: 'dark' as const,
            primary: { main: '#facc15' }, // Neon Yellow
            secondary: { main: '#06b6d4' }, // Neon Cyan
            background: {
                default: '#090514',
                paper: '#130b29',
            },
            text: {
                primary: '#ffffff',
                secondary: '#a78bfa',
            },
            divider: 'rgba(250, 204, 21, 0.2)',
        },
        chart: {
            set1: '#facc15', // Yellow
            set2: '#06b6d4', // Cyan
            set3: '#f43f5e', // Pink
            fadeBackground:
                'linear-gradient(180deg, rgba(250, 204, 21, 0.15) 0%, rgba(0, 0, 0, 0) 100%)',
        },
    },

    // 10. Miami Vice (Neon Pink & Cyan)
    miamiVice: {
        name: 'Miami Vice',
        palette: {
            mode: 'dark' as const,
            primary: { main: '#ec4899' }, // Hot Pink
            secondary: { main: '#22d3ee' }, // Cyan
            background: {
                default: '#0b0c16',
                paper: '#16192b',
            },
            text: {
                primary: '#fdf2f8',
                secondary: '#94a3b8',
            },
            divider: 'rgba(236, 72, 153, 0.2)',
        },
        chart: {
            set1: '#ec4899', // Pink
            set2: '#22d3ee', // Cyan
            set3: '#a855f7', // Purple
            fadeBackground:
                'linear-gradient(180deg, rgba(236, 72, 153, 0.15) 0%, rgba(0, 0, 0, 0) 100%)',
        },
    },

    // 11. Desert Sand (Warm, Muted Earth Tones)
    desertSand: {
        name: 'Desert Sand',
        palette: {
            mode: 'dark' as const,
            primary: { main: '#d97706' }, // Warm Warm Terracotta
            secondary: { main: '#b45309' }, // Sandstone
            background: {
                default: '#14110e',
                paper: '#211c18',
            },
            text: {
                primary: '#fef3c7',
                secondary: '#a89f91',
            },
            divider: 'rgba(217, 119, 6, 0.15)',
        },
        chart: {
            set1: '#d97706', // Warm Amber
            set2: '#059669', // Sage Green
            set3: '#b45309', // Earth Brown
            fadeBackground:
                'linear-gradient(180deg, rgba(217, 119, 6, 0.12) 0%, rgba(0, 0, 0, 0) 100%)',
        },
    },
} as const;

// 2. Base Component Overrides applied across all themes
const baseComponentOverrides: ThemeOptions['components'] = {
    MuiCard: {
        styleOverrides: {
            root: ({ theme }) => ({
                backgroundImage: 'none',
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 14,
                boxShadow:
                    theme.palette.mode === 'dark'
                        ? '0 4px 14px rgba(0, 0, 0, 0.4)'
                        : '0 2px 10px rgba(0, 0, 0, 0.05)',
            }),
        },
    },
    MuiDivider: {
        styleOverrides: {
            root: ({ theme }) => ({
                borderColor: theme.palette.divider,
            }),
        },
    },
    MuiButton: {
        defaultProps: {
            variant: 'outlined',
        },
        styleOverrides: {
            root: {
                borderRadius: 10,
                textTransform: 'none',
                fontWeight: 600,
            },
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
        styleOverrides: {
            paper: ({ theme }) => ({
                backgroundImage: 'none',
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 16,
            }),
        },
    },
    MuiBottomNavigation: {
        styleOverrides: {
            root: ({ theme }) => ({
                backgroundColor: theme.palette.background.paper,
            }),
        },
    },
    MuiBottomNavigationAction: {
        styleOverrides: {
            root: ({ theme }) => ({
                color: theme.palette.text.secondary,
                '&.Mui-selected': {
                    color: theme.palette.primary.main,
                },
            }),
        },
    },
};

export type ThemeKey = keyof typeof THEMES;

export function createAppTheme(themeKey: string) {
    const selected = THEMES[themeKey as ThemeKey] || THEMES.defaultMui;

    return createTheme({
        palette: selected.palette,
        chart: selected.chart,
        components: baseComponentOverrides,
    });
}

const defaultTheme = createAppTheme('dark');
export default defaultTheme;
