'use client';

import { dbInstance } from '@/database/db';
import { Settings } from '@mui/icons-material';
import { Button, Dialog, IconButton } from '@mui/material';
import { useLiveQuery } from 'dexie-react-hooks';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import EditPlanDialog from '../EditPlanDialog';
import PlanContainer from '../PlanContainer';

export default function PlanDialog() {
    const { id: idString } = useParams<{ id: string }>();
    const planId = Number(idString);

    const plan = useLiveQuery(() => dbInstance.WorkoutPlan.get(planId));
    const [showEditDialog, setShowEditDialog] = useState(false);
    return (
        <PlanContainer
            title={plan?.name ?? ''}
            headerButtons={
                <IconButton onClick={() => setShowEditDialog(true)}>
                    <Settings />
                </IconButton>
            }
        >
            <Button>maus?</Button>

            <Dialog open={showEditDialog} onClose={closeEditDialog}>
                {showEditDialog && (
                    <EditPlanDialog onClose={closeEditDialog} plan={plan} />
                )}
            </Dialog>
        </PlanContainer>
    );

    function closeEditDialog() {
        setShowEditDialog(false);
    }
}
