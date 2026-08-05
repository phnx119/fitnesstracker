'use client';

import TabContentStack from '@/components/TabContentStack';
import { dbInstance } from '@/database/db';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Collapse, IconButton, Stack, Typography } from '@mui/material';
import { useLiveQuery } from 'dexie-react-hooks';
import { useState } from 'react';
import PersonalBiografieCard from './PersonalBiografieCard';

export default function ExercisePage() {
    const [expanded, setExpanded] = useState(false);
    const personalData = useLiveQuery(() => dbInstance.PersonalData.get(1));

    return (
        <TabContentStack sx={{ gap: 1, overflow: 'auto' }}>
            <Stack direction="row">
                <Box sx={{ flex: 1 }} />
                <Typography>Overview</Typography>
                <Box sx={{ flex: 1 }} />
            </Stack>
            <Stack sx={{ overflow: 'auto', gap: 1 }}>
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
                    <Stack sx={{ gap: 1 }}>
                        <PersonalBiografieCard
                            label={'Body Height'}
                            bioValue={personalData?.bodyHeight}
                        />
                        <PersonalBiografieCard
                            label={'Body Weight'}
                            bioValue={personalData?.bodyWeight}
                        />
                        <PersonalBiografieCard
                            label={'Body Fat'}
                            bioValue={personalData?.bodyFat}
                        />
                        <PersonalBiografieCard
                            label={'Body Fat'}
                            bioValue={personalData?.bodyFat}
                        />
                        <PersonalBiografieCard
                            label={'Body Fat'}
                            bioValue={personalData?.bodyFat}
                        />
                    </Stack>
                </Collapse>
            </Stack>
            <Stack>
                <Box>
                    <Typography>Kalorie graph Placeholder</Typography>
                </Box>
            </Stack>
            <Stack>
                <Box>
                    <Typography>Kalorie subpage access / rerouting</Typography>
                </Box>
            </Stack>
        </TabContentStack>
    );
}
