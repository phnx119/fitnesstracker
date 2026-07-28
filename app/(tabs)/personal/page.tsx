// app/(tabs)/exercise/page.tsx
'use client';

import { Box, Card, CardContent, Stack, Typography } from '@mui/material';

export default function ExercisePage() {
    return (
        <Stack sx={{ flex: 1, gap: 1, m: 1 }}>
            <Stack direction="row" sx={{}}>
                <Box sx={{ flex: 1 }} />
                <Typography>Overview</Typography>
                <Box sx={{ flex: 1 }} />
            </Stack>
            <Stack sx={{ flex: 1, gap: 1, m: 1 }}>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h6">Bodyheight</Typography>
                        <Typography variant="body1">Emptycheck</Typography>
                    </CardContent>
                </Card>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h6">Bodyweight</Typography>
                        <Typography variant="body1">Emptycheck2</Typography>
                    </CardContent>
                </Card>
            </Stack>
        </Stack>
    );
}
