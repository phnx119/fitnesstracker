import { Button, Stack } from '@mui/material';

export default function loading() {
    return (
        <Stack sx={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button loading variant="text" disabled />
        </Stack>
    );
}
