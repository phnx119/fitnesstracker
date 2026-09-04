'use client';

import { Card, Stack, Typography } from '@mui/material';
import { PropsWithChildren } from 'react';

export default function HomeWidgetCard({
    flex = 1,
    title = undefined,
    children,
}: PropsWithChildren<{ flex?: number; title?: string | undefined }>) {
    return (
        <Stack sx={{ flex: flex }}>
            <Card sx={{ flex: flex, p: 1 }}>
                {title && (
                    <Stack sx={{ justifyContent: 'center', ml: 2, mt: 1 }}>
                        <Typography color="textSecondary">{title}</Typography>
                    </Stack>
                )}
                {children}
            </Card>
        </Stack>
    );
}
