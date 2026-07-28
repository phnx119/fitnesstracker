import { Card, CardContent, Stack } from '@mui/material';
import { PropsWithChildren } from 'react';

export default function SettingsGroup({ children }: PropsWithChildren) {
    return (
        <Card>
            <CardContent>
                <Stack sx={{ gap: 3 }}>{children}</Stack>
            </CardContent>
        </Card>
    );
}
