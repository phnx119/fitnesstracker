'use client';

import { Box, Card, CardContent, Stack, Typography } from '@mui/material';

export default function ExercisePage() {
    return (
        //This sx is quite perfect and works as intended. Set bgcolor to see.
        <Stack sx={{ flex: 1, gap: 1, m: 1 }}>
            <Stack direction="row" sx={{}}>
                <Box sx={{ flex: 1 }} />
                <Typography>Overview</Typography>
                <Box sx={{ flex: 1 }} />
            </Stack>
            {/* This one still causes problems */}
            <Stack sx={{ gap: 1, m: 1, overflowY: 'auto' }}>
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
                {/*

                This still causes problems, the parent stack does not create a scroll bar and grows 
                indefenitly. AI states this is caused by root layout configuration. Need to consult back with Lucas.

                Currently, Cards are forced to shrink, rather than to be scrolled.

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
                */}
            </Stack>
        </Stack>
    );
}
