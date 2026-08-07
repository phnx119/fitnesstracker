'use client';

import TabContentStack from '@/components/TabContentStack';
import { dbInstance } from '@/database/db';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Box,
    Button,
    Collapse,
    IconButton,
    Stack,
    Typography,
} from '@mui/material';
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
                    <Button
                        sx={{ marginBottom: 1 }}
                        onClick={() => updatePersonalData()}
                    >
                        Save
                    </Button>
                    <Stack sx={{ gap: 1 }}>
                        <PersonalBiografieCard
                            label={'Body Weight'}
                            bioValue={personalData?.bodyWeight}
                        />
                        <PersonalBiografieCard
                            label={'Body Height'}
                            bioValue={personalData?.bodyHeight}
                        />
                        <PersonalBiografieCard
                            label={'Body Fat'}
                            bioValue={personalData?.bodyFat}
                        />
                        <PersonalBiografieCard
                            label={'Target Weight'}
                            bioValue={personalData?.targetWeight}
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

    function updatePersonalData() {
        if (personalData?.id) {
            dbInstance.PersonalData.update(personalData.id, {
                bodyWeight: 200,
                bodyHeight: 100,
                bodyFat: 100,
                targetWeight: 100,
            });
        } else {
            dbInstance.PersonalData.add({
                id: 1,
                bodyWeight: 33,
                bodyHeight: 33,
                bodyFat: 33,
                targetWeight: 33,
            });
        }
    }
}
