'use client';

import TabContentStack from '@/components/TabContentStack';
import { dbInstance } from '@/database/db';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Collapse, IconButton, Stack, Typography } from '@mui/material';
import { useLiveQuery } from 'dexie-react-hooks';
import { useState } from 'react';

export default function ExercisePage() {
    const [expanded, setExpanded] = useState(false);
    const personalData = useLiveQuery(() => dbInstance.PersonalData.get(0));

    return (
        <TabContentStack sx={{ gap: 1, overflow: 'auto' }}>
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
                    {/* To do: make expand propmt more visually appealing */}
                    <Stack sx={{ gap: 1 }}>
                        {/* container to fix compression */}
                        {/* Place new Card Structure here */}
                    </Stack>
                </Collapse>
            </Stack>
        </TabContentStack>
    );
}
