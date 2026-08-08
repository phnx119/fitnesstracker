'use client';

import ImagePicker from '@/components/ImagePicker';
import { dbInstance, Row } from '@/database/db';
import { Stack, TextField } from '@mui/material';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PlanSettings() {
    const { id: idString } = useParams<{ id: string }>();
    const planId = Number(idString);

    const [plan, setPlan] = useState<Row<'WorkoutPlan'> | null>(null);
    const [planName, setPlanName] = useState('');

    useEffect(() => {
        loadPlan();
    }, []);
    return (
        <Stack sx={{ pt: 1, flex: 1, gap: 1 }}>
            <ImagePicker tableName="WorkoutPlan" dbRowId={planId} />
            <TextField
                label="Name"
                value={planName}
                onChange={(e) => setPlanName(e.target.value)}
            />
        </Stack>
    );

    async function loadPlan() {
        await dbInstance.WorkoutPlan.get(planId).then((plan) => {
            if (plan) {
                setPlan(plan);
                setPlanName(plan.name);
            } else {
                setPlan(null);
            }
        });
    }
}
