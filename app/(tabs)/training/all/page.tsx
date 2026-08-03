'use client';

import { dbInstance } from '@/database/db';
import { Button, Card, Dialog, Stack } from '@mui/material';
import { useLiveQuery } from 'dexie-react-hooks';
import { useState } from 'react';
import PlanContainer from '../PlanContainer';
import EditMachineDialog from '../[id]/EditMachineDialog';

export default function AllMachines() {
    const allMachines = useLiveQuery(() => dbInstance.Machine.toArray()) ?? [];
    const [showEditDialog, setShowEditDialog] = useState(false);
    return (
        <PlanContainer title="All" headerButtons={null}>
            <Stack sx={{ gap: 1, overflow: 'auto', flex: 1 }}>
                {allMachines.map((item) => (
                    <Card key={item.id}>{item.name}</Card>
                ))}
                <Card>
                    <Button onClick={() => setShowEditDialog(true)}>add</Button>
                </Card>
            </Stack>

            <Dialog open={showEditDialog} onClose={closeEditDialog}>
                <EditMachineDialog onClose={closeEditDialog} />
            </Dialog>
        </PlanContainer>
    );

    function closeEditDialog() {
        setShowEditDialog(false);
    }
}
