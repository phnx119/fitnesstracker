import { Divider, Stack, Typography } from '@mui/material';

export default function MiniHeader({ title }: { title: string }) {
    return (
        <Stack sx={{ mb: 1, mt: 2 }}>
            <Divider />
            <Typography sx={{ textAlign: 'center' }} color="textDisabled">
                {title}
            </Typography>
            <Divider />
        </Stack>
    );
}
