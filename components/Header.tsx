'use client';

import { Close } from '@mui/icons-material';
import { Box, Divider, IconButton, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { PropsWithChildren } from 'react';

export default function Header({
    title,
    showClose = false,
    children,
}: PropsWithChildren<{
    title?: string;
    showClose?: boolean;
}>) {
    const router = useRouter();

    return (
        <Stack
            sx={{
                backgroundColor: 'background.paper',
            }}
        >
            <Stack
                direction="row"
                sx={{
                    gap: 1,
                    p: 1,
                    pl: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '56px',
                }}
            >
                {title && <Typography variant="h6">{title}</Typography>}

                <Box sx={{ flex: 1 }} />

                {children}

                {showClose && (
                    <IconButton onClick={() => router.back()}>
                        <Close />
                    </IconButton>
                )}
            </Stack>

            <Divider />
        </Stack>
    );
}

//mausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmaus
// - has mui divider at the bottom (!may have the same color as background!)
// - showClose displays a button at the far right for browser back
// - other buttons can be passed as children and will be shown on the right, gap included
// - do not put it into a stack with padding
//mausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmaus
