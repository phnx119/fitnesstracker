'use client';

import NumberField from '@/components/NumberField';
import { dbInstance } from '@/database/db';
import { Stack } from '@mui/material';
import { useLiveQuery } from 'dexie-react-hooks';
import { useEffect, useRef, useState } from 'react';

export default function SetInput({ setId }: { setId: number }) {
    const setData = useLiveQuery(
        () => dbInstance.SetRecord.get(setId),
        [setId],
    );
    const [localReps, setLocalReps] = useState<number | null>(null);
    const [localWeight, setLocalWeight] = useState<number | null>(null);

    const weightDebounce = useRef<NodeJS.Timeout | null>(null);
    const repsDebounce = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        return () => {
            if (weightDebounce.current) clearTimeout(weightDebounce.current);
            if (repsDebounce.current) clearTimeout(repsDebounce.current);
        };
    }, []);

    const reps = localReps !== null ? localReps : (setData?.reps ?? 12);
    const weight = localWeight !== null ? localWeight : (setData?.weight ?? 0);

    return (
        <Stack direction="row" sx={{ gap: 2 }}>
            <NumberField
                label="Reps"
                value={reps}
                onValueChange={(e) => updateReps(e)}
                showButtons
            />
            <NumberField
                label="Weight"
                value={weight}
                onValueChange={(e) => updateWeight(e)}
                showButtons
            />
        </Stack>
    );

    function updateWeight(newValue: number | null) {
        if (newValue === null || newValue === undefined) {
            return;
        }
        setLocalWeight(newValue);
        if (weightDebounce.current) clearTimeout(weightDebounce.current);
        weightDebounce.current = setTimeout(async () => {
            await dbInstance.SetRecord.update(setId, {
                weight: newValue,
            });
            setLocalWeight(null);
        }, 300);
    }

    function updateReps(newValue: number | null) {
        if (newValue === null || newValue === undefined) {
            return;
        }
        setLocalReps(newValue);
        if (repsDebounce.current) clearTimeout(repsDebounce.current);
        repsDebounce.current = setTimeout(async () => {
            await dbInstance.SetRecord.update(setId, {
                reps: newValue,
            });
            setLocalReps(null);
        }, 300);
    }
}
