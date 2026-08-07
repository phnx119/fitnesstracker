'use client';

import { dbInstance, Row } from '@/database/db';
import { Button, Card, Dialog, Stack } from '@mui/material';
import { useLiveQuery } from 'dexie-react-hooks';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import TrainingContainer from '../TrainingContainer';
import EditMachineDialog from './EditMachineDialog';
import MachineList from './MachineList';

export default function AllMachinesPage() {
    const pathName = usePathname();
    const router = useRouter();
    const allMachines = useLiveQuery(() => dbInstance.Machine.toArray()) ?? [];
    const [showEditDialog, setShowEditDialog] = useState(false);
    return (
        <TrainingContainer title="All" headerButtons={null}>
            <Stack sx={{ gap: 1, overflow: 'auto', flex: 1 }}>
                <MachineList
                    machines={allMachines}
                    onClick={handleMachineClick}
                />
                <Card>
                    <Button onClick={() => setShowEditDialog(true)}>add</Button>
                </Card>
            </Stack>

            <Dialog open={showEditDialog} onClose={closeEditDialog}>
                <EditMachineDialog onClose={closeEditDialog} />
            </Dialog>
        </TrainingContainer>
    );

    function handleMachineClick(machine: Row<'Machine'>) {
        router.push(`${pathName}/${machine.id}`);
    }

    function closeEditDialog() {
        setShowEditDialog(false);
    }
}
