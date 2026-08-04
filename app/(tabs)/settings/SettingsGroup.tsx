import { Card, Stack } from '@mui/material';
import { PropsWithChildren } from 'react';

export default function SettingsGroup({ children }: PropsWithChildren) {
    return (
        <Card>
            <Stack sx={{ gap: 3, p: 2 }}>{children}</Stack>
        </Card>
    );
}
