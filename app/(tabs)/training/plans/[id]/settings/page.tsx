'use client';

import ImagePicker from '@/components/ImagePicker';
import { dbInstance, Row } from '@/database/db';
import {
    debounce,
    FormControlLabel,
    Stack,
    Switch,
    TextField,
} from '@mui/material';
import { useParams } from 'next/navigation';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import TrainingContainer from '../../../TrainingContainer';

export default function PlanSettings() {
    const { id: idString } = useParams<{ id: string }>();
    const planId = Number(idString);

    const [plan, setPlan] = useState<Row<'WorkoutPlan'> | null>(null);

    useEffect(() => {
        if (!planId) return;
        dbInstance.WorkoutPlan.get(planId).then((fetchedPlan) => {
            setPlan(fetchedPlan ?? null);
        });
    }, [planId]);

    const debouncedSave = useMemo(
        () =>
            debounce((value: string) => {
                dbInstance.WorkoutPlan.update(planId, { name: value });
            }, 300),
        [planId],
    );

    useEffect(() => () => debouncedSave.clear(), [debouncedSave]);

    const handleFavoriteToggle = async (e: ChangeEvent<HTMLInputElement>) => {
        const favorite = e.target.checked;
        setPlan((prev) => (prev ? { ...prev, favorite } : null));
        await dbInstance.WorkoutPlan.update(planId, { favorite });
    };

    if (!plan) return null;

    return (
        <TrainingContainer title="Edit Plan">
            <Stack sx={{ gap: 1, flex: 1 }}>
                <ImagePicker tableName="WorkoutPlan" dbRowId={planId} />
                <TextField
                    key={plan.name}
                    label="Name"
                    defaultValue={plan.name}
                    onChange={(e) => debouncedSave(e.target.value)}
                />
                <FormControlLabel
                    control={
                        <Switch
                            checked={Boolean(plan.favorite)}
                            onChange={handleFavoriteToggle}
                        />
                    }
                    label="Show in last used"
                />
            </Stack>
        </TrainingContainer>
    );
}
