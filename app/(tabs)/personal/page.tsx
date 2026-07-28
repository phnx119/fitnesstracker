'use client';

import { Box, Card, CardContent, Stack, Typography } from '@mui/material';

export default function ExercisePage() {
    return (
        <Stack sx={{ flex: 1, gap: 1, m: 1, bgcolor: 'blue' }}>
            <Stack direction="row" sx={{}}>
                <Box sx={{ flex: 1 }} />
                <Typography>Overview</Typography>
                <Box sx={{ flex: 1 }} />
            </Stack>
            <Stack sx={{ gap: 1, m: 1, overflowY: 'auto', maxHeight: 500 }}>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h6">Bodyheight</Typography>
                        <Typography variant="body1">Emptycheck</Typography>
                    </CardContent>
                </Card>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h6">Bodyweight1</Typography>
                        <Typography variant="body1">Emptycheck2</Typography>
                    </CardContent>
                </Card>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h6">Bodyweight2</Typography>
                        <Typography variant="body1">Emptycheck2</Typography>
                    </CardContent>
                </Card>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h6">Bodyweight3</Typography>
                        <Typography variant="body1">Emptycheck2</Typography>
                    </CardContent>
                </Card>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h6">Bodyweight4</Typography>
                        <Typography variant="body1">Emptycheck2</Typography>
                    </CardContent>
                </Card>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h6">Bodyweight5</Typography>
                        <Typography variant="body1">Emptycheck2</Typography>
                    </CardContent>
                </Card>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h6">Bodyweight6</Typography>
                        <Typography variant="body1">Emptycheck2</Typography>
                    </CardContent>
                </Card>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h6">Bodyweight7</Typography>
                        <Typography variant="body1">Emptycheck2</Typography>
                    </CardContent>
                </Card>
            </Stack>
        </Stack>
    );
}
