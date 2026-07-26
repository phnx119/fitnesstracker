// components/ThemeRegistry.tsx
'use client';

import theme from '@/theme';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

export default function ThemeRegistry({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ThemeProvider theme={theme}>
            {/* CssBaseline fixes browser background consistency and applies standard resets */}
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}
