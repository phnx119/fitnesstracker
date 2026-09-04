'use client';

import ImagePicker from '@/components/ImagePicker';
import { dbInstance, Row } from '@/database/db';
import { debounce, Stack, Switch, TextField } from '@mui/material';
import { useParams } from 'next/navigation';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import TrainingContainer from '../../../TrainingContainer';

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
    return plan ? (
        <TrainingContainer title="Edit Plan">
            <Stack sx={{ gap: 1, flex: 1 }}>
                <ImagePicker tableName="WorkoutPlan" dbRowId={planId} />
                <TextField
                    key={plan.name}
                    label="Name"
                    defaultValue={plan.name}
                    onChange={(e) => debouncedSave(e.target.value)}
                />
                <Switch
                    checked={plan.favorite}
                    onChange={(e) => toggleFavorite(e)}
                />
            </Stack>
        </TrainingContainer>
    ) : null;

    async function loadPlan() {
        await dbInstance.WorkoutPlan.get(planId).then((plan) => {
            if (plan) {
                setPlan(plan);
            } else {
                setPlan(null);
            }
        });
    }

    async function toggleFavorite(e: ChangeEvent<HTMLInputElement, Element>) {
        await dbInstance.WorkoutPlan.update(planId, {
            favorite: e.target.checked,
        });

        loadPlan();
    }
}
