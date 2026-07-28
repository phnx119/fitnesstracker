'use client';

import { Box, Card, CardContent, Stack, Typography } from '@mui/material';

export default function ExercisePage() {
    const testArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    return (
        //This sx is quite perfect and works as intended. Set bgcolor to see.
        <Stack sx={{ flex: 1, gap: 1, m: 1, overflow: 'auto' }}>
            <Stack direction="row" sx={{}}>
                <Box sx={{ flex: 1 }} />
                <Typography>Overview</Typography>
                <Box sx={{ flex: 1 }} />
            </Stack>
            {/* This one still causes problems */}
            <Stack sx={{ gap: 1, m: 1, overflow: 'auto', flex: 1 }}>
                {/* 
                This still causes problems, the parent stack does not create a scroll bar and grows 
                indefenitly. AI states this is caused by root layout configuration. Need to consult back with Lucas.

                Currently, Cards are forced to shrink, rather than to be scrolled. */}

                {testArr.map((item) => (
                    <Card variant="outlined" key={item}>
                        <CardContent>
                            <Typography variant="h6">
                                Bodyweight {item}
                            </Typography>
                            <Typography variant="body1">Emptycheck2</Typography>
                        </CardContent>
                    </Card>
                ))}
            </Stack>
        </Stack>
    );
}
