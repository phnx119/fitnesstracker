'use client';

import { dbInstance } from '@/database/db';
import { Stack, Typography } from '@mui/material';
import { useLiveQuery } from 'dexie-react-hooks';
import { useParams } from 'next/navigation';

export default function PlanDialog() {
    const { id: idString } = useParams<{ id: string }>();
    const planId = Number(idString);

    const plan = useLiveQuery(() => dbInstance.WorkoutPlan.get(planId));
    return (
        <Stack sx={{ flex: 1 }}>
            <Typography>{plan?.name}</Typography>
            <Typography>{planId}</Typography>
        </Stack>
    );
}
