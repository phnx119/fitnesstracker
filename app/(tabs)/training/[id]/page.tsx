'use client';

import ImagePicker from '@/components/ImagePicker';
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

            <ImagePicker onSave={saveImage} />

            <Dialog open={showEditDialog} onClose={closeEditDialog}>
                {showEditDialog && (
                    <EditPlanDialog onClose={closeEditDialog} plan={plan} />
                )}
            </Dialog>
        </PlanContainer>
    );

    async function saveImage(file: File) {
        // 1. Update the Machine record in Dexie
        if (!plan) {
            return;
        }

        await dbInstance.WorkoutPlan.update(plan.id, {
            imageBlob: file, // Storing the raw file directly
        });
    }

    function closeEditDialog() {
        setShowEditDialog(false);
    }
}
