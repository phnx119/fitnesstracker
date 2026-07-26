// app/(tabs)/layout.tsx
import BottomNav from '@/app/components/navigation/BottomNav';
import { Stack } from '@mui/material';

export default function TabsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Stack sx={{ flex: 1 }}>
            {children}
            <BottomNav />
        </Stack>
    );
}
