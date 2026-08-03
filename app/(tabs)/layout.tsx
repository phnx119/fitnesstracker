'use client';

import BottomNav from '@/app/_helpers/navigation/BottomNav';
import { dbInstance } from '@/database/db';
import { Stack } from '@mui/material';
import { useEffect } from 'react';

export default function TabsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    useEffect(() => {
        async function ensureSettings() {
            const settings = await dbInstance.Settings.get(1);
            if (!settings) {
                await dbInstance.Settings.put({
                    id: 1,
                    showDbViewer: true,
                    landingPage: '/training',
                });
            }
        }

        ensureSettings();
    }, []);

    return (
        <Stack sx={{ height: '100%', width: '100%' }}>
            <Stack sx={{ flex: 1, minHeight: 0 }}>{children}</Stack>
            <BottomNav />
        </Stack>
    );
}
