import { Box, Divider, Stack, Typography } from '@mui/material';
import { PropsWithChildren } from 'react';

export default function Header({
    title,
    children,
}: PropsWithChildren<{
    title?: string;
}>) {
    return (
        <Stack sx={{ ml: -2, mr: -2 }}>
            <Stack direction="row" sx={{ gap: 1, p: 1 }}>
                <Typography variant="h5">{title}</Typography>

                <Box sx={{ flex: 1 }} />

                {children}
            </Stack>

            <Divider />
        </Stack>
    );
}
