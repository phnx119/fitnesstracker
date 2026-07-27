import { Button, Stack, Typography } from '@mui/material';

export default function loading() {
    return (
        <Stack sx={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h1">Loading</Typography>
            <Button loading variant="text" disabled />
        </Stack>
    );
}
