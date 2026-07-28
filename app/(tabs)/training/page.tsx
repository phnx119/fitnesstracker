'use client';

import { dbInstance } from '@/database/db';
import { Button, Dialog, Stack } from '@mui/material';
import { useLiveQuery } from 'dexie-react-hooks';
import { useState } from 'react';
import EditPlanDialog from './EditPlanDialog';
import PlanCard from './PlanCard';

export default function ExercisePage() {
    const [showAddPlanDialog, setShowAddPlanDialog] = useState(false);
    const plans = useLiveQuery(() => dbInstance.WorkoutPlan.toArray());
    return (
        <Stack sx={{ flex: 1, gap: 1 }}>
            {plans?.map((item) => (
                <PlanCard key={item.id} plan={item} />
            ))}
            <Button onClick={() => setShowAddPlanDialog(true)}>maus</Button>
            <Dialog open={showAddPlanDialog} onClose={closeAddPlanDialog}>
                <EditPlanDialog onClose={closeAddPlanDialog} />
            </Dialog>
        </Stack>
    );

    function closeAddPlanDialog() {
        setShowAddPlanDialog(false);
    }
}
