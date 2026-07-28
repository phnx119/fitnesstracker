'use client';

import { dbInstance, Row } from '@/database/db';
import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
} from '@mui/material';
import { useState } from 'react';

export default function EditPlanDialog({
    onClose,
    plan,
}: {
    onClose(): void;
    plan?: Row<'WorkoutPlan'>;
}) {
    const [planName, setPlanName] = useState(plan?.name ?? '');
    return (
        <>
            <DialogTitle>{plan?.id ? 'Edit Plan' : 'Add a Plan'}</DialogTitle>
            <DialogContent>
                <Stack sx={{ pt: 1, flex: 1 }}>
                    <TextField
                        label="Name"
                        value={planName}
                        onChange={(e) => setPlanName(e.target.value)}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    onClick={savePlan}
                    disabled={planName === '' || planName === plan?.name}
                >
                    Save
                </Button>
            </DialogActions>
        </>
    );

    function savePlan() {
        if (plan?.id) {
            dbInstance.WorkoutPlan.update(plan.id, {
                name: planName,
            });
        } else {
            dbInstance.WorkoutPlan.add({
                name: planName,
            });
        }
        onClose();
    }
}
