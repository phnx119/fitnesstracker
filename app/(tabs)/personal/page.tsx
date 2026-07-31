'use client';

import TabContentStack from '@/components/TabContentStack';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Collapse, IconButton, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import PersonalBiografieCard from './PersonalBiografieCard';

export default function ExercisePage() {
    const [expanded, setExpanded] = useState(false);

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
                        <PersonalBiografieCard />
                    </Stack>
                </Collapse>
            </Stack>
        </TabContentStack>
    );
}
