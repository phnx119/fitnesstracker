import Header from '@/components/Header';
import { Stack } from '@mui/material';
import { PropsWithChildren } from 'react';

export default function csLayout({ children }: PropsWithChildren) {
    return (
        <Stack sx={{ flex: 1, overflow: 'auto' }}>
            <Header showHome>test</Header>
            <Stack sx={{ flex: 1, overflow: 'auto' }}>{children}</Stack>
        </Stack>
    );
}
