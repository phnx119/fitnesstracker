'use client';
import BottomNav from '@/app/components/navigation/BottomNav';
import { dbInstance } from '@/database/db';
import { Divider, Stack } from '@mui/material';
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
                });
            }
        }

        ensureSettings();
    }, []);

    return (
        <Stack sx={{ flex: 1 }}>
            {children}
            <Divider />
            <BottomNav />
        </Stack>
    );
}
