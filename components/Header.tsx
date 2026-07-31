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
        <Stack>
            <Stack
                direction="row"
                sx={{
                    gap: 1,
                    p: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
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
