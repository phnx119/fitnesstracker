'use client';

import { Button, Dialog, Stack } from '@mui/material';
import { useState } from 'react';
import AddPlanDialog from './AddPlanDialog';

export default function ExercisePage() {
    const [showAddPlanDialog, setShowAddPlanDialog] = useState(false);
    return (
        <Stack sx={{ flex: 1, gap: 1 }}>
            <Button onClick={() => setShowAddPlanDialog(true)}>maus</Button>
            <Dialog open={showAddPlanDialog} onClose={closeAddPlanDialog}>
                <AddPlanDialog onClose={closeAddPlanDialog} />
            </Dialog>
        </Stack>
    );

    function closeAddPlanDialog() {
        setShowAddPlanDialog(false);
    }
}
