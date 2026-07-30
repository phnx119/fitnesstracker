'use client';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Box,
    Card,
    CardContent,
    Collapse,
    IconButton,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { useState } from 'react';

export default function ExercisePage() {
    const [expanded, setExpanded] = useState(false);

    return (
        <Stack sx={{ flex: 1, gap: 1, m: 1, overflow: 'auto' }}>
            <Stack direction="row">
                <Box sx={{ flex: 1 }} />
                <Typography>Overview</Typography>
                <Box sx={{ flex: 1 }} />
            </Stack>
            <Stack sx={{ overflow: 'auto' }}>
                {/* This Stack holds the expand/collaps Button for the cards-stack */}
                <Stack direction="row">
                    <Typography variant="h6">Show Biometric Data</Typography>
                    <IconButton onClick={() => setExpanded(!expanded)}>
                        <ExpandMoreIcon
                            sx={{
                                transform: expanded ? 'rotate(180deg)' : '',
                                transition: '0.2s',
                            }}
                        />
                    </IconButton>
                </Stack>
                <Collapse in={expanded}>
                    {/* This stack holds the biometric data cards */}
                    {/* To do: make expand propmt more visually appealing */}
                    <Stack sx={{ gap: 1 }}>
                        {/* To do: implement automatic Card generation via DB entries inside this stack*/}
                        {/* container to fix compression */}
                        <Card variant="outlined">
                            {/* To do: make content editable, db data saving and visualisation */}
                            <CardContent>
                                <Typography variant="h6">Bodyheight</Typography>
                                <TextField
                                    label="Enter value"
                                    variant="standard"
                                />
                            </CardContent>
                        </Card>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="h6">Bodyweight</Typography>
                                <TextField
                                    label="Enter value"
                                    variant="filled"
                                />
                            </CardContent>
                        </Card>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="h6">
                                    Bodyfat in %
                                </Typography>
                                <TextField
                                    label="Enter value"
                                    variant="outlined"
                                />
                            </CardContent>
                        </Card>
                    </Stack>
                </Collapse>
            </Stack>
        </Stack>
    );
}
