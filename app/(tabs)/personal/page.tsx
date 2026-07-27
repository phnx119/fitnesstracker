// app/(tabs)/exercise/page.tsx
'use client';

import { Box, Card, CardContent, Stack, Typography } from '@mui/material';

export default function ExercisePage() {
    return (
        <Stack sx={{ flex: 1, gap: 1, m: 1, bgcolor: 'red' }}>
            <Stack direction="row" sx={{ bgcolor: 'blue' }}>
                <Box sx={{ flex: 1 }} />
                <Typography>Overview</Typography>
                <Box sx={{ flex: 1 }} />
            </Stack>
            <Stack sx={{ flex: 1, gap: 1, m: 1, bgcolor: 'purple' }}>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h6">I am a Test Header</Typography>
                        <Typography variant="body1">
                            I am a test Text
                        </Typography>
                    </CardContent>
                </Card>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h6">
                            I am a second Test Header
                        </Typography>
                        <Typography variant="body1">
                            I am a second test Text
                        </Typography>
                    </CardContent>
                </Card>
            </Stack>
        </Stack>
        //Test commit to check for Github Account
    );
}
