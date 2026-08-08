'use client';

import ImagePicker from '@/components/ImagePicker';
import { dbInstance, Row } from '@/database/db';
import { debounce, Stack, TextField } from '@mui/material';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

export default function PlanSettings() {
    const { id: idString } = useParams<{ id: string }>();
    const planId = Number(idString);

    const [plan, setPlan] = useState<Row<'WorkoutPlan'> | null>(null);

    useEffect(() => {
        loadPlan();
    }, []);

    const debouncedSave = useMemo(
        () =>
            debounce(async (value: string) => {
                await dbInstance.WorkoutPlan.update(planId, {
                    name: value,
                });
            }, 300),
        [planId],
    );
    return (
        <Stack sx={{ pt: 1, flex: 1, gap: 1 }}>
            <ImagePicker tableName="WorkoutPlan" dbRowId={planId} />
            <TextField
                key={plan?.name}
                label="Name"
                defaultValue={plan?.name}
                onChange={(e) => debouncedSave(e.target.value)}
            />
        </Stack>
    );

    async function loadPlan() {
        await dbInstance.WorkoutPlan.get(planId).then((plan) => {
            if (plan) {
                setPlan(plan);
            } else {
                setPlan(null);
            }
        });
    }
}
