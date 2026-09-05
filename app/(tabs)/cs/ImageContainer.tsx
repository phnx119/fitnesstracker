import { Stack } from '@mui/material';
import { PropsWithChildren } from 'react';

export default function ImageContainer({
    children,
    width = '100%',
    height = '150px',
}: PropsWithChildren<{
    width?: string;
    height?: string;
}>) {
    return (
        <Stack sx={{ width: width, height: height, position: 'relative' }}>
            {children}
        </Stack>
    );
}
