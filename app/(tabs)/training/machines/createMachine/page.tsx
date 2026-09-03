'use client';

import Header from '@/components/Header';
import { dbInstance } from '@/database/db';
import { Button, Stack, TextField } from '@mui/material';
import { useState } from 'react';

export default function CreateMachine() {
    const [machineName, setMachineName] = useState('');

    return (
        <>
            <Header title="Create Machine">
                <Button onClick={createMachine}>Save</Button>
            </Header>

            <Stack sx={{ gap: 1, flex: 1, overflow: 'auto', p: 2 }}>
                <TextField
                    label="Name"
                    value={machineName}
                    onChange={(e) => setMachineName(e.target.value)}
                />
            </Stack>
        </>
    );

    function createMachine() {
        dbInstance.Machine.add({
            name: machineName,
            imageBlob: undefined,
        });
    }
}
