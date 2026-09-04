'use client';

import { dbInstance } from '@/database/db';
import { Card, Stack } from '@mui/material';
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
                        <Card sx={{ p: 1 }}>{plan.name}</Card>
                    </Stack>
                ))}
        </HomeWidgetCard>
    );
}
