'use client';

import ImagePicker from '@/components/ImagePicker';
import { dbInstance, Row } from '@/database/db';
import { debounce, Stack, TextField } from '@mui/material';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

export default function MachineSettings() {
    const { id: idString } = useParams<{ id: string }>();
    const machineId = Number(idString);

    const [machine, setMachine] = useState<Row<'Machine'> | null>(null);

    useEffect(() => {
        loadMachine();
    }, []);

    const debouncedSave = useMemo(
        () =>
            debounce(async (value: string) => {
                await dbInstance.Machine.update(machineId, {
                    name: value,
                });
            }, 300),
        [machineId],
    );
    return (
        <Stack sx={{ pt: 1, flex: 1, gap: 1 }}>
            <ImagePicker tableName="Machine" dbRowId={machineId} />
            <TextField
                key={machine?.name}
                label="Name"
                defaultValue={machine?.name}
                onChange={(e) => debouncedSave(e.target.value)}
            />
        </Stack>
    );

    async function loadMachine() {
        await dbInstance.Machine.get(machineId).then((m) => {
            if (m) {
                setMachine(m);
            } else {
                setMachine(null);
            }
        });
    }
}
