'use client';

import { dbInstance } from '@/database/db';
import { Settings } from '@mui/icons-material';
import { Button, Dialog, IconButton } from '@mui/material';
import { useLiveQuery } from 'dexie-react-hooks';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import TrainingContainer from '../../TrainingContainer';
import EditMachineDialog from '../EditMachineDialog';

export default function MachinePage() {
    const { id: idString } = useParams<{ id: string }>();
    const machineId = Number(idString);
    const machine = useLiveQuery(() => dbInstance.Machine.get(machineId));

    const [showEditDialog, setShowEditDialog] = useState(false);

    return machine ? (
        <TrainingContainer
            title={machine.name}
            headerButtons={
                <IconButton onClick={() => setShowEditDialog(true)}>
                    <Settings />
                </IconButton>
            }
        >
            <Button>maus</Button>

            <Dialog open={showEditDialog} onClose={closeEditDialog}>
                <EditMachineDialog
                    onClose={closeEditDialog}
                    machine={machine}
                />
            </Dialog>
        </TrainingContainer>
    ) : null;

    function closeEditDialog() {
        setShowEditDialog(false);
    }
}
