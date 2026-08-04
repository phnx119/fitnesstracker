'use client';

import { dbInstance } from '@/database/db';
import { Button } from '@mui/material';
import { useLiveQuery } from 'dexie-react-hooks';
import { useParams } from 'next/navigation';
import TrainingContainer from '../../TrainingContainer';

export default function MachinePage() {
    const { id: idString } = useParams<{ id: string }>();
    const machineId = Number(idString);
    const machine = useLiveQuery(() => dbInstance.Machine.get(machineId));
    return machine ? (
        <TrainingContainer title={machine.name}>
            <Button>maus</Button>
        </TrainingContainer>
    ) : null;
}
