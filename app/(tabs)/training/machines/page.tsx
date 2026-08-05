'use client';

import { dbInstance } from '@/database/db';
import { Button, Card, Dialog, Stack } from '@mui/material';
import { useLiveQuery } from 'dexie-react-hooks';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import TrainingContainer from '../TrainingContainer';
import EditMachineDialog from './EditMachineDialog';

export default function AllMachinesPage() {
    const pathName = usePathname();
    const allMachines = useLiveQuery(() => dbInstance.Machine.toArray()) ?? [];
    const [showEditDialog, setShowEditDialog] = useState(false);
    return (
        <TrainingContainer title="All" headerButtons={null}>
            <Stack sx={{ gap: 1, overflow: 'auto', flex: 1 }}>
                {allMachines.map((item) => (
                    <Link href={`${pathName}/${item.id}`} key={item.id}>
                        <Card>{item.name}</Card>
                    </Link>
                ))}
                <Card>
                    <Button onClick={() => setShowEditDialog(true)}>add</Button>
                </Card>
            </Stack>

            <Dialog open={showEditDialog} onClose={closeEditDialog}>
                <EditMachineDialog onClose={closeEditDialog} />
            </Dialog>
        </TrainingContainer>
    );

    function closeEditDialog() {
        setShowEditDialog(false);
    }
}
