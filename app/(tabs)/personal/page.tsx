// app/(tabs)/exercise/page.tsx
'use client';

import { Button, Stack, Typography } from '@mui/material';

export default function ExercisePage() {
    return (
        <Stack sx={{ flex: 1 }}>
            <Typography>Personal</Typography>
            <Button variant="contained" color="primary">
                maus
            </Button>
        </Stack>
    );
}
