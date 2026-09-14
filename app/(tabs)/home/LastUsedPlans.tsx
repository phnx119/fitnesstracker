'use client';

import { dbInstance } from '@/database/db';
import { Box, Card, Stack, Typography } from '@mui/material';
import { useLiveQuery } from 'dexie-react-hooks';
import Link from 'next/link';
import HomeWidgetCard from './HomeWidgetCard';

export default function LastUsedPlans() {
    const lastPlans = useLiveQuery(async () => {
        const plans = await dbInstance.WorkoutPlan.filter((plan) =>
            Boolean(plan.favorite),
        ).toArray();
        return plans.sort((a, b) => (b.lastUsed ?? 0) - (a.lastUsed ?? 0));
    });

    return (
        <HomeWidgetCard title="Last used Plans" flex={1}>
            {lastPlans?.map((plan) => (
                <Link href={`/training/plans/${plan.id}`} key={plan.id}>
                    <Stack>
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
                </Link>
            ))}
        </HomeWidgetCard>
    );
}
