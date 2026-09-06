'use client';

import { Dialog, Stack } from '@mui/material';
import { PropsWithChildren, useState } from 'react';

export default function ImageContainer({
    children,
    width = '100%',
    height = '100%',
    dialogAspectRatio = 1,
    direction = 'column',
}: PropsWithChildren<{
    width?: string;
    height?: string;
    dialogAspectRatio?: number;
    direction?: 'column' | 'row';
}>) {
    const [openDialog, setOpenDialog] = useState(false);
    return (
        <>
            <Stack
                sx={{ flex: 1, maxHeight: height }}
                onClick={() => setOpenDialog(true)}
            >
                <Stack
                    sx={{ width: width, height: height, position: 'relative' }}
                    direction={direction}
                >
                    {children}
                </Stack>
            </Stack>
            <Dialog open={openDialog} onClose={closeDialog}>
                <Stack sx={{ p: 1, aspectRatio: dialogAspectRatio }}>
                    {children}
                </Stack>
            </Dialog>
        </>
    );

    function closeDialog() {
        setOpenDialog(false);
    }
}
