'use client';

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
import { useState } from 'react';

export default function AddMachineDialog({
    onClose,
    machine,
}: {
    onClose(): void;
    machine?: Row<'Machine'>;
}) {
    const [machineName, setMachineName] = useState(machine?.name ?? '');
    return (
        <>
            <DialogTitle>
                {machine?.id ? 'Edit Machine' : 'Add a Machine'}
            </DialogTitle>
            <DialogContent>
                <Stack sx={{ gap: 1, flex: 1 }}>
                    {machine?.id && (
                        <ImagePicker dbRowId={machine.id} tableName="Machine" />
                    )}
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
        if (machine?.id) {
            dbInstance.Machine.update(machine.id, {
                name: machineName,
            });
        } else {
            dbInstance.Machine.add({
                name: machineName,
                imageBlob: undefined,
            });
        }
        onClose();
    }
}
