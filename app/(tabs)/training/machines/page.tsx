'use client';

import { dbInstance, Row } from '@/database/db';
import { Button, Stack } from '@mui/material';
import { useLiveQuery } from 'dexie-react-hooks';
import { usePathname, useRouter } from 'next/navigation';
import TrainingContainer from '../TrainingContainer';
import MachineList from './MachineList';

export default function AllMachinesPage() {
    const pathName = usePathname();
    const router = useRouter();
    const allMachines = useLiveQuery(() => dbInstance.Machine.toArray()) ?? [];
    return (
        <TrainingContainer title="All" headerButtons={null}>
            <Stack sx={{ gap: 1, overflow: 'auto', flex: 1 }}>
                <MachineList
                    machines={allMachines}
                    onClick={handleMachineClick}
                />

                <Button
                    onClick={() => router.push(`${pathName}/createMachine`)}
                >
                    Create Machine
                </Button>
            </Stack>
        </TrainingContainer>
    );

    function handleMachineClick(machine: Row<'Machine'>) {
        router.push(`${pathName}/${machine.id}`);
    }
}
