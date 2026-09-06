import { Stack } from '@mui/material';
import { PropsWithChildren } from 'react';

export default function ImageContainer({
    children,
    width = '100%',
    height = '100%',
    direction = 'column',
}: PropsWithChildren<{
    width?: string;
    height?: string;
    direction?: 'column' | 'row';
}>) {
    return (
        <Stack sx={{ flex: 1, maxHeight: height }}>
            <Stack
                sx={{ width: width, height: height, position: 'relative' }}
                direction={direction}
            >
                {children}
            </Stack>
        </Stack>
    );
}
