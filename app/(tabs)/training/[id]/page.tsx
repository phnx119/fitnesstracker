'use client';

import { dbInstance } from '@/database/db';
import { Settings } from '@mui/icons-material';
import { Box, Dialog, IconButton, Stack, Typography } from '@mui/material';
import { useLiveQuery } from 'dexie-react-hooks';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import EditPlanDialog from '../EditPlanDialog';

export default function PlanDialog() {
    const { id: idString } = useParams<{ id: string }>();
    const planId = Number(idString);

    const plan = useLiveQuery(() => dbInstance.WorkoutPlan.get(planId));
    const [showEditDialog, setShowEditDialog] = useState(false);
    return (
        <Stack sx={{ flex: 1 }}>
            <Stack direction="row">
                <Box sx={{ flex: 1 }} />
                <IconButton onClick={() => setShowEditDialog(true)}>
                    <Settings />
                </IconButton>
            </Stack>
            <Typography>{plan?.name}</Typography>
            <Typography>{planId}</Typography>

            <Dialog open={showEditDialog} onClose={closeEditDialog}>
                {showEditDialog && (
                    <EditPlanDialog
                        open={showEditDialog}
                        onClose={closeEditDialog}
                        plan={plan}
                    />
                )}
            </Dialog>
        </Stack>
    );

    function closeEditDialog() {
        setShowEditDialog(false);
    }
}
