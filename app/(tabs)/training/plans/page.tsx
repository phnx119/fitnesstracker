'use client';

import Header from '@/components/Header';
import TabContentStack from '@/components/TabContentStack';
import { dbInstance } from '@/database/db';
import { Button, Card, Dialog, Stack, Typography } from '@mui/material';
import { useLiveQuery } from 'dexie-react-hooks';
import Link from 'next/link';
import { useState } from 'react';
import EditPlanDialog from '../EditPlanDialog';
import PlanCard from '../PlanCard';

export default function PlanListPage() {
    const [showAddPlanDialog, setShowAddPlanDialog] = useState(false);
    const plans = useLiveQuery(() => dbInstance.WorkoutPlan.toArray()) ?? [];

    return (
        <Stack>
            <Header title="Hier wird gemaust" />
            <TabContentStack sx={{ gap: 1 }}>
                <Link href={'/training/machines'}>
                    <Card>
                        <Stack
                            direction="row"
                            sx={{ alignItems: 'center', p: 2 }}
                        >
                            <Typography>All</Typography>
                        </Stack>
                    </Card>
                </Link>
                {plans.map((item) => (
                    <PlanCard key={item.id} plan={item} />
                ))}
                <Button onClick={() => setShowAddPlanDialog(true)}>maus</Button>
                <Dialog open={showAddPlanDialog} onClose={closeAddPlanDialog}>
                    <EditPlanDialog onClose={closeAddPlanDialog} />
                </Dialog>
            </TabContentStack>
        </Stack>
    );

    function closeAddPlanDialog() {
        setShowAddPlanDialog(false);
    }
}
