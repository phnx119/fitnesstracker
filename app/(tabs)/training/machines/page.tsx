'use client';

import { dbInstance, Row } from '@/database/db';
import { Button, Dialog, Stack } from '@mui/material';
import { useLiveQuery } from 'dexie-react-hooks';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import TrainingContainer from '../TrainingContainer';
import AddMachineDialog from './AddMachineDialog';
import MachineList from './MachineList';

export default function AllMachinesPage() {
    const pathName = usePathname();
    const router = useRouter();
    const allMachines = useLiveQuery(() => dbInstance.Machine.toArray()) ?? [];
    const [showAddDialog, setShowAddDialog] = useState(false);
    return (
        <TrainingContainer title="All" headerButtons={null}>
            <Stack sx={{ gap: 1, overflow: 'auto', flex: 1 }}>
                <MachineList
                    machines={allMachines}
                    onClick={handleMachineClick}
                />

                <Button onClick={() => setShowAddDialog(true)}>add</Button>
            </Stack>

            <Dialog open={showAddDialog} onClose={closeAddDialog} fullScreen>
                <AddMachineDialog onClose={closeAddDialog} />
            </Dialog>
        </TrainingContainer>
    );

    function handleMachineClick(machine: Row<'Machine'>) {
        router.push(`${pathName}/${machine.id}`);
    }

    function closeAddDialog() {
        setShowAddDialog(false);
    }
}
