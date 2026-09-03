'use client';

import Header from '@/components/Header';
import { dbInstance } from '@/database/db';
import { Button, Stack, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CreateMachine() {
    const [planName, setPlanName] = useState('');
    const router = useRouter();

    return (
        <>
            <Header title="Create Plan">
                <Button onClick={createPlan}>Save</Button>
            </Header>

            <Stack sx={{ gap: 1, flex: 1, overflow: 'auto', p: 2 }}>
                <TextField
                    label="Name"
                    value={planName}
                    onChange={(e) => setPlanName(e.target.value)}
                />
            </Stack>
        </>
    );

    function createPlan() {
        dbInstance.WorkoutPlan.add({
            name: planName,
            imageBlob: undefined,
            lastUsed: undefined,
        });

        router.back();
    }
}
