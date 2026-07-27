import { dbInstance } from '@/database/db';
import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
} from '@mui/material';
import { useState } from 'react';

export default function AddPlanDialog({ onClose }: { onClose(): void }) {
    const [planName, setPlanName] = useState('');
    return (
        <>
            <DialogTitle>Add a Plan</DialogTitle>
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
                <Button onClick={savePlan} disabled={planName === ''}>
                    Save
                </Button>
            </DialogActions>
        </>
    );

    function savePlan() {
        dbInstance.WorkoutPlan.add({
            name: planName,
        });
        onClose();
    }
}
