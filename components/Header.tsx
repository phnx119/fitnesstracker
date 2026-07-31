import { Box, Divider, Stack, Typography } from '@mui/material';
import { PropsWithChildren } from 'react';

export default function Header({
    title,
    children,
}: PropsWithChildren<{
    title?: string;
}>) {
    return (
        <Stack>
            <Stack
                direction="row"
                sx={{
                    gap: 1,
                    p: 1,
                    pl: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h6">{title}</Typography>

                <Box sx={{ flex: 1 }} />

                {children}
            </Stack>

            <Divider />
        </Stack>
    );
}
