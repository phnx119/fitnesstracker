'use client';

import BottomNav from '@/app/_helpers/navigation/BottomNav';
import { Stack } from '@mui/material';

export default function TabsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Stack sx={{ flex: 1, width: '100%', minHeight: 0 }}>
            <Stack sx={{ flex: 1, minHeight: 0 }}>{children}</Stack>
            <BottomNav />
        </Stack>
    );
}
