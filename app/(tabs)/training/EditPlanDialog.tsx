'use client';

import { BlobImage } from '@/components/BlobImage';
import ImagePicker from '@/components/ImagePicker';
import { dbInstance, Row } from '@/database/db';
import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
} from '@mui/material';
import { useLiveQuery } from 'dexie-react-hooks';
import { useState } from 'react';

export default function EditPlanDialog({
    onClose,
    plan,
}: {
    onClose(): void;
    plan?: Row<'WorkoutPlan'>;
}) {
    const [planName, setPlanName] = useState(plan?.name ?? '');

    const livePlan = useLiveQuery(
        () => (plan?.id ? dbInstance.WorkoutPlan.get(plan.id) : undefined),
        [plan?.id],
    );

    const activePlan = livePlan ?? plan;

    return (
        <>
            <DialogTitle>
                {activePlan?.id ? 'Edit Plan' : 'Add a Plan'}
            </DialogTitle>
            <DialogContent>
                <Stack sx={{ pt: 1, flex: 1, gap: 1 }}>
                    <BlobImage blob={activePlan?.imageBlob} />
                    <TextField
                        label="Name"
                        value={planName}
                        onChange={(e) => setPlanName(e.target.value)}
                    />
                    {activePlan?.id && (
                        <ImagePicker
                            tableName="WorkoutPlan"
                            dbRowId={activePlan.id}
                        />
                    )}
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={savePlan}>Save</Button>
            </DialogActions>
        </>
    );

    function savePlan() {
        if (activePlan?.id) {
            dbInstance.WorkoutPlan.update(activePlan.id, {
                name: planName,
            });
        } else {
            dbInstance.WorkoutPlan.add({
                name: planName,
                imageBlob: undefined,
            });
        }
        onClose();
    }
}
