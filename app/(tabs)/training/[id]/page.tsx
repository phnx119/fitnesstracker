'use client';

import Header from '@/components/Header';
import { dbInstance } from '@/database/db';
import { Close, Settings } from '@mui/icons-material';
import { Button, Dialog, IconButton, Stack } from '@mui/material';
import { useLiveQuery } from 'dexie-react-hooks';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import EditPlanDialog from '../EditPlanDialog';

export default function PlanDialog() {
    const { id: idString } = useParams<{ id: string }>();
    const planId = Number(idString);

    const router = useRouter();

    const plan = useLiveQuery(() => dbInstance.WorkoutPlan.get(planId));
    const [showEditDialog, setShowEditDialog] = useState(false);
    return (
        <Stack sx={{ flex: 1 }}>
            <Header title={plan?.name}>
                <IconButton onClick={() => setShowEditDialog(true)}>
                    <Settings />
                </IconButton>

                <IconButton onClick={() => router.back()}>
                    <Close />
                </IconButton>
            </Header>

            <Stack sx={{ flex: 1, p: 1 }}>
                <Button>maus?</Button>
            </Stack>

            <Dialog open={showEditDialog} onClose={closeEditDialog}>
                {showEditDialog && (
                    <EditPlanDialog onClose={closeEditDialog} plan={plan} />
                )}
            </Dialog>
        </Stack>
    );

    function closeEditDialog() {
        setShowEditDialog(false);
    }
}
