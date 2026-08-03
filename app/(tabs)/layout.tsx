'use client';

import BottomNav from '@/app/_helpers/navigation/BottomNav';
import { Stack } from '@mui/material';

export default function TabsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Stack sx={{ height: '100%', width: '100%' }}>
            <Stack sx={{ flex: 1, minHeight: 0 }}>{children}</Stack>
            <BottomNav />
        </Stack>
    );
}
