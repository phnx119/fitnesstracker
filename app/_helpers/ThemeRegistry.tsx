'use client';

import { dbInstance } from '@/database/db';
import { createAppTheme } from '@/theme';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { useLiveQuery } from 'dexie-react-hooks';
import { PropsWithChildren, useMemo } from 'react';

export default function ThemeRegistry({ children }: PropsWithChildren) {
    const settings = useLiveQuery(() => dbInstance.Settings.get(1));
    const activeThemeKey = settings?.theme || 'dark';

    const theme = useMemo(
        () => createAppTheme(activeThemeKey),
        [activeThemeKey],
    );

    return (
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </AppRouterCacheProvider>
    );
}
