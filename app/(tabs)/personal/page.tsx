'use client';

import { dbInstance } from '@/database/db';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Collapse,
    IconButton,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { useLiveQuery } from 'dexie-react-hooks';
import { useState } from 'react';

export default function ExercisePage() {
    const [expanded, setExpanded] = useState(false);
    const personalData = useLiveQuery(() => dbInstance.PersonalData.get(0));

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
                                transform: expanded
                                    ? 'rotate(180deg)'
                                    : 'rotate(0deg)',
                                transition: '0.2s',
                            }}
                        />
                    </IconButton>
                </Stack>
                <Collapse in={expanded}>
                    {/* This stack holds the biometric data cards */}
                    {/* To do: make expand propmt more visually appealing */}
                    <Stack sx={{ gap: 1 }}>
                        {/* container to fix compression */}

                        {/* New startegie: hardcode Cards which only display, when pressed open EditBioDialog */}
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="h6">Bodyweight</Typography>
                                <TextField
                                    value={
                                        personalData?.bodyWeight ??
                                        'Enter your body weight'
                                    }
                                    variant="standard"
                                />
                            </CardContent>
                            <CardActions>
                                <Button size="small">Edit</Button>
                            </CardActions>
                        </Card>
                    </Stack>
                </Collapse>
            </Stack>
        </Stack>
    );
}
