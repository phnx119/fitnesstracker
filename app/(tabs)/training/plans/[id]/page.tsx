'use client';

import { dbInstance, Row } from '@/database/db';
import { DashboardCustomize, Settings } from '@mui/icons-material';
import { Dialog, IconButton } from '@mui/material';
import { useLiveQuery } from 'dexie-react-hooks';
import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import MachineList from '../../machines/MachineList';
import TrainingContainer from '../../TrainingContainer';
import AddPlanDialog from '../AddPlanDialog';
import MachineSelect from './MachineSelect';

export default function PlanPage() {
    const router = useRouter();
    const pathName = usePathname();
    const planTable = dbInstance.WorkoutPlan;

    const { id: idString } = useParams<{ id: string }>();
    const planId = Number(idString);
    const plan = useLiveQuery(() => planTable.get(planId));

    const machines =
        useLiveQuery(() => getPlanMachines(planId), [planId]) ?? [];

    const [showAddDialog, setShowAddDialog] = useState(false);
    const [showMachineSelect, setShowMachineSelect] = useState(false);

    return plan ? (
        <TrainingContainer
            title={plan.name ?? ''}
            headerButtons={
                <>
                    <IconButton onClick={() => setShowMachineSelect(true)}>
                        <DashboardCustomize />
                    </IconButton>
                    <Link href={`${pathName}/settings`}>
                        <IconButton>
                            <Settings />
                        </IconButton>
                    </Link>
                </>
            }
        >
            <MachineList machines={machines} onClick={handleMachineClick} />

            <Dialog open={showAddDialog} onClose={closeAddDialog} fullScreen>
                {showAddDialog && <AddPlanDialog onClose={closeAddDialog} />}
            </Dialog>

            <Dialog
                open={showMachineSelect}
                onClose={closeMachineSelect}
                fullScreen
            >
                {showMachineSelect && (
                    <MachineSelect onClose={closeMachineSelect} plan={plan} />
                )}
            </Dialog>
        </TrainingContainer>
    ) : null;

    function handleMachineClick(machine: Row<'Machine'>) {
        router.push(`/training/machines/${machine.id}`);
    }

    function closeAddDialog() {
        setShowAddDialog(false);
    }

    function closeMachineSelect() {
        setShowMachineSelect(false);
    }

    async function getPlanMachines(planId: number) {
        const planMachines = await dbInstance.PlanMachine.where('planId')
            .equals(planId)
            .toArray();

        if (planMachines.length === 0) {
            return [];
        }

        const machines = await Promise.all(
            planMachines.map((pm) => dbInstance.Machine.get(pm.machineId)),
        );

        return machines.filter((m) => m !== undefined);
    }
}
