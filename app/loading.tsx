import { CircularProgress, Stack, Typography } from '@mui/material';

export default function GlobalLoading() {
    return (
        <Stack
            sx={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <CircularProgress size={32} />
            <Typography variant="caption">Loading...</Typography>
        </Stack>
    );
}
