import { Divider, Stack, Typography } from '@mui/material';

export default function MiniHeader({ title }: { title: string }) {
    return (
        <Stack sx={{ my: 1 }}>
            <Divider />
            <Typography sx={{ textAlign: 'center' }} color="textDisabled">
                {title}
            </Typography>
            <Divider />
        </Stack>
    );
}
