'use client';

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

export default function AddMachineDialog({ onClose }: { onClose(): void }) {
    const [machineName, setMachineName] = useState('');

    return (
        <>
            <DialogTitle>Add a Machine</DialogTitle>
            <DialogContent>
                <Stack sx={{ gap: 1, flex: 1 }}>
                    <TextField
                        label="Name"
                        value={machineName}
                        onChange={(e) => setMachineName(e.target.value)}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={savePlan}>Save</Button>
            </DialogActions>
        </>
    );

    function savePlan() {
        dbInstance.Machine.add({
            name: machineName,
            imageBlob: undefined,
        });

        onClose();
    }
}
