'use client';

import { dbInstance } from '@/database/db';
import { Apps } from '@mui/icons-material';
import { Button, Dialog, IconButton, Stack } from '@mui/material';
import { useLiveQuery } from 'dexie-react-hooks';
import Link from 'next/link';
import { useState } from 'react';
import TrainingContainer from '../TrainingContainer';
import AddPlanDialog from './AddPlanDialog';
import PlanCard from './PlanCard';

export default function PlanListPage() {
    const [showAddPlanDialog, setShowAddPlanDialog] = useState(false);
    const plans = useLiveQuery(() => dbInstance.WorkoutPlan.toArray()) ?? [];

    return (
        <TrainingContainer
            title="Hier wird gemaust"
            headerButtons={
                <Link href={'/training/machines'}>
                    <IconButton>
                        <Apps />
                    </IconButton>
                </Link>
            }
            showClose={false}
        >
            <Stack sx={{ overflow: 'auto', gap: 1, mb: 1 }}>
                {plans.map((item) => (
                    <PlanCard key={item.id} plan={item} />
                ))}
            </Stack>
            <Button onClick={() => setShowAddPlanDialog(true)}>Add Plan</Button>
            <Dialog
                open={showAddPlanDialog}
                onClose={closeAddPlanDialog}
                fullScreen
            >
                <AddPlanDialog onClose={closeAddPlanDialog} />
            </Dialog>
        </TrainingContainer>
    );

    function closeAddPlanDialog() {
        setShowAddPlanDialog(false);
    }
}
