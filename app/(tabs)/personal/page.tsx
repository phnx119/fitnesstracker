// app/(tabs)/exercise/page.tsx
'use client';

import { Box, Stack, Typography } from '@mui/material';

export default function ExercisePage() {
    return (
        <Stack sx={{ flex: 1, gap: 1, m: 1, bgcolor: 'red' }}>
            <Stack direction="row" sx={{ bgcolor: 'blue' }}>
                <Box sx={{ flex: 1 }} />
                <Typography>Overview</Typography>
                <Box sx={{ flex: 1 }} />
            </Stack>
        </Stack>
    );
}
