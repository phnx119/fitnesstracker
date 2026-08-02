'use client';

import { Stack } from '@mui/material';
import dynamic from 'next/dynamic';

const BottomNav = dynamic(() => import('@/app/_helpers/navigation/BottomNav'), {
    ssr: false,
});

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
