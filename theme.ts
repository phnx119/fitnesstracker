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
            primary: { main: '#d97706' }, // Warm Terracotta
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

    // 12. Tokyo Night (Deep Indigo & Soft Cyan/Lavender)
    tokyoNight: {
        name: 'Tokyo Night',
        palette: {
            mode: 'dark' as const,
            primary: { main: '#7aa2f7' }, // Soft Blue
            secondary: { main: '#bb9af7' }, // Lavender
            background: {
                default: '#1a1b26',
                paper: '#24283b',
            },
            text: {
                primary: '#c0caf5',
                secondary: '#7982a9',
            },
            divider: 'rgba(122, 162, 247, 0.16)',
        },
        chart: {
            set1: '#7dcfff', // Cyan
            set2: '#bb9af7', // Lavender
            set3: '#f7768e', // Coral Pink
            fadeBackground:
                'linear-gradient(180deg, rgba(122, 162, 247, 0.14) 0%, rgba(0, 0, 0, 0) 100%)',
        },
    },

    // 13. Nord Frost (Glacial Arctic Slate)
    nordFrost: {
        name: 'Nord Frost',
        palette: {
            mode: 'dark' as const,
            primary: { main: '#88c0d0' }, // Frost Blue
            secondary: { main: '#81a1c1' }, // Glacier Blue
            background: {
                default: '#242933',
                paper: '#2e3440',
            },
            text: {
                primary: '#eceff4',
                secondary: '#d8dee9',
            },
            divider: 'rgba(136, 192, 208, 0.18)',
        },
        chart: {
            set1: '#a3be8c', // Nord Green
            set2: '#ebcb8b', // Nord Gold
            set3: '#bf616a', // Nord Red
            fadeBackground:
                'linear-gradient(180deg, rgba(136, 192, 208, 0.12) 0%, rgba(0, 0, 0, 0) 100%)',
        },
    },

    // 14. Synthwave '84 (Neon Outrun Sunset)
    synthwave84: {
        name: "Synthwave '84",
        palette: {
            mode: 'dark' as const,
            primary: { main: '#ff7edb' }, // Hot Pink
            secondary: { main: '#36f9f6' }, // Electric Cyan
            background: {
                default: '#161324',
                paper: '#26203d',
            },
            text: {
                primary: '#fdf2f8',
                secondary: '#a79ac5',
            },
            divider: 'rgba(255, 126, 219, 0.2)',
        },
        chart: {
            set1: '#36f9f6', // Turquoise
            set2: '#fede5d', // Sunset Gold
            set3: '#fe4450', // Neon Red
            fadeBackground:
                'linear-gradient(180deg, rgba(255, 126, 219, 0.15) 0%, rgba(0, 0, 0, 0) 100%)',
        },
    },

    // 15. Volcanic Magma (Obsidian & Lava Fire)
    volcanicMagma: {
        name: 'Volcanic Magma',
        palette: {
            mode: 'dark' as const,
            primary: { main: '#ff5722' }, // Molten Orange
            secondary: { main: '#ff9800' }, // Blaze Amber
            background: {
                default: '#101012',
                paper: '#1c1c20',
            },
            text: {
                primary: '#fff5f2',
                secondary: '#9ca3af',
            },
            divider: 'rgba(255, 87, 34, 0.18)',
        },
        chart: {
            set1: '#ff5722', // Magma Orange
            set2: '#ffeb3b', // Lava Yellow
            set3: '#f44336', // Fire Red
            fadeBackground:
                'linear-gradient(180deg, rgba(255, 87, 34, 0.14) 0%, rgba(0, 0, 0, 0) 100%)',
        },
    },

    // 16. Matcha Zen (Bamboo & Fresh Green)
    matchaZen: {
        name: 'Matcha Zen',
        palette: {
            mode: 'dark' as const,
            primary: { main: '#84cc16' }, // Matcha Lime
            secondary: { main: '#a3e635' }, // Leaf Green
            background: {
                default: '#0f1510',
                paper: '#18221a',
            },
            text: {
                primary: '#f7fee7',
                secondary: '#8ba38d',
            },
            divider: 'rgba(132, 204, 22, 0.16)',
        },
        chart: {
            set1: '#84cc16', // Matcha
            set2: '#facc15', // Bamboo Gold
            set3: '#fb7185', // Blossom Pink
            fadeBackground:
                'linear-gradient(180deg, rgba(132, 204, 22, 0.12) 0%, rgba(0, 0, 0, 0) 100%)',
        },
    },

    // 17. Deep Abyss (Bioluminescent Ocean)
    deepAbyss: {
        name: 'Deep Abyss',
        palette: {
            mode: 'dark' as const,
            primary: { main: '#00e5ff' }, // Electric Aqua
            secondary: { main: '#00b0ff' }, // Ocean Blue
            background: {
                default: '#050e14',
                paper: '#0b1a24',
            },
            text: {
                primary: '#e0f7fa',
                secondary: '#78909c',
            },
            divider: 'rgba(0, 229, 255, 0.16)',
        },
        chart: {
            set1: '#00e5ff', // Aqua
            set2: '#76ff03', // Neon Lime
            set3: '#ff4081', // Coral Pink
            fadeBackground:
                'linear-gradient(180deg, rgba(0, 229, 255, 0.12) 0%, rgba(0, 0, 0, 0) 100%)',
        },
    },

    // 18. Royal Amethyst (Velvet Purple & Gold)
    royalAmethyst: {
        name: 'Royal Amethyst',
        palette: {
            mode: 'dark' as const,
            primary: { main: '#a855f7' }, // Amethyst Purple
            secondary: { main: '#fbbf24' }, // Royal Gold
            background: {
                default: '#0e0717',
                paper: '#1c102c',
            },
            text: {
                primary: '#faf5ff',
                secondary: '#a89ec4',
            },
            divider: 'rgba(168, 85, 247, 0.18)',
        },
        chart: {
            set1: '#c084fc', // Lavender
            set2: '#fbbf24', // Gold
            set3: '#f43f5e', // Ruby
            fadeBackground:
                'linear-gradient(180deg, rgba(168, 85, 247, 0.14) 0%, rgba(0, 0, 0, 0) 100%)',
        },
    },

    // 19. Coffee Espresso (Rich Warm Mocha)
    coffeeEspresso: {
        name: 'Coffee Espresso',
        palette: {
            mode: 'dark' as const,
            primary: { main: '#c28b5d' }, // Caramel
            secondary: { main: '#e0a96d' }, // Toasted Mocha
            background: {
                default: '#120c09',
                paper: '#1f1611',
            },
            text: {
                primary: '#fffbeb',
                secondary: '#a89f91',
            },
            divider: 'rgba(194, 139, 93, 0.16)',
        },
        chart: {
            set1: '#4ade80', // Mint
            set2: '#e0a96d', // Caramel
            set3: '#f87171', // Berry Red
            fadeBackground:
                'linear-gradient(180deg, rgba(194, 139, 93, 0.12) 0%, rgba(0, 0, 0, 0) 100%)',
        },
    },

    // 20. Dracula Classic (Iconic Vampire Slate)
    draculaClassic: {
        name: 'Dracula Classic',
        palette: {
            mode: 'dark' as const,
            primary: { main: '#bd93f9' }, // Dracula Purple
            secondary: { main: '#ff79c6' }, // Dracula Pink
            background: {
                default: '#1e1f29',
                paper: '#282a36',
            },
            text: {
                primary: '#f8f8f2',
                secondary: '#6272a4',
            },
            divider: 'rgba(189, 147, 249, 0.18)',
        },
        chart: {
            set1: '#50fa7b', // Dracula Green
            set2: '#8be9fd', // Dracula Cyan
            set3: '#ff5555', // Dracula Red
            fadeBackground:
                'linear-gradient(180deg, rgba(189, 147, 249, 0.12) 0%, rgba(0, 0, 0, 0) 100%)',
        },
    },

    // 21. Carbon Graphite (Gym Chartreuse / High-Voltage Neon)
    carbonGraphite: {
        name: 'Carbon Graphite',
        palette: {
            mode: 'dark' as const,
            primary: { main: '#ccff00' }, // Electric Chartreuse
            secondary: { main: '#38bdf8' }, // Sky Blue
            background: {
                default: '#111215',
                paper: '#1a1c22',
            },
            text: {
                primary: '#f3f4f6',
                secondary: '#9ca3af',
            },
            divider: 'rgba(204, 255, 0, 0.18)',
        },
        chart: {
            set1: '#ccff00', // Chartreuse
            set2: '#38bdf8', // Sky Blue
            set3: '#f43f5e', // Hot Pink
            fadeBackground:
                'linear-gradient(180deg, rgba(204, 255, 0, 0.12) 0%, rgba(0, 0, 0, 0) 100%)',
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

const defaultTheme = createAppTheme('defaultMui');
export default defaultTheme;
