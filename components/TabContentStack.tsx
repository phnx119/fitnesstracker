import { Stack, StackProps } from '@mui/material';
import { PropsWithChildren } from 'react';

export default function TabContentStack({
    children,
    sx,
    ...props
}: PropsWithChildren<StackProps>) {
    return (
        <Stack sx={{ flex: 1, p: 1, ...sx }} {...props}>
            {children}
        </Stack>
    );
}
