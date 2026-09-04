'use client';

import { dbInstance } from '@/database/db';
import { Box, Card, Stack, Typography } from '@mui/material';
import { useLiveQuery } from 'dexie-react-hooks';
import HomeWidgetCard from './HomeWidgetCard';

export default function LastUsedPlans() {
    const lastPlans = useLiveQuery(() =>
        dbInstance.WorkoutPlan.filter(
            (plan) => plan.favorite === true,
        ).toArray(),
    );
    return (
        <HomeWidgetCard title="Last used Plans" flex={1}>
            {lastPlans
                ?.sort((a, b) => (b.lastUsed ?? 0) - (a.lastUsed ?? 0))
                .map((plan) => (
                    <Stack key={plan.id}>
                        <Card sx={{ p: 1, px: 2 }}>
                            <Stack direction="row">
                                <Typography>{plan.name}</Typography>
                                <Box sx={{ flex: 1 }} />
                                {plan.lastUsed && (
                                    <Typography>
                                        {new Date(
                                            plan.lastUsed,
                                        ).toLocaleDateString('de-DE', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: '2-digit',
                                        })}
                                    </Typography>
                                )}
                            </Stack>
                        </Card>
                    </Stack>
                ))}
        </HomeWidgetCard>
    );
}
