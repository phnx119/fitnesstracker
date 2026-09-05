import { Divider, Stack, Typography } from '@mui/material';

export default function MiniHeader({ title }: { title: string }) {
    return (
        <Stack>
            <Divider />
            <Typography sx={{ textAlign: 'center' }}>{title}</Typography>
            <Divider />
        </Stack>
    );
}
