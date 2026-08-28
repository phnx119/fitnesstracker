import { Card, Stack, Typography } from '@mui/material';
import { PropsWithChildren } from 'react';

export default function SettingsGroup({
    header = '',
    children,
}: PropsWithChildren<{
    header?: string;
}>) {
    return (
        <Card>
            <Stack sx={{ p: 2, gap: 2 }}>
                {header && (
                    <Stack
                        sx={{ alignItems: 'center', justifyContent: 'center' }}
                    >
                        <Typography
                            variant="h6"
                            color="textSecondary"
                            sx={{ mt: -1 }}
                        >
                            {header}
                        </Typography>
                    </Stack>
                )}
                {children}
            </Stack>
        </Card>
    );
}
