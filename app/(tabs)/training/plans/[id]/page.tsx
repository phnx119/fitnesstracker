'use client';

import { dbInstance, Row } from '@/database/db';
import { DashboardCustomize, Settings } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useLiveQuery } from 'dexie-react-hooks';
import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';
import MachineList from '../../machines/MachineList';
import TrainingContainer from '../../TrainingContainer';

export default function PlanPage() {
    const router = useRouter();
    const pathName = usePathname();
    const planTable = dbInstance.WorkoutPlan;

    const { id: idString } = useParams<{ id: string }>();
    const planId = Number(idString);
    const plan = useLiveQuery(() => planTable.get(planId));

    const machines =
        useLiveQuery(() => getPlanMachines(planId), [planId]) ?? [];

    return plan ? (
        <TrainingContainer
            title={plan.name ?? ''}
            headerButtons={
                <>
                    <Link href={`${pathName}/addMachine`}>
                        <IconButton>
                            <DashboardCustomize />
                        </IconButton>
                    </Link>

                    <Link href={`${pathName}/settings`}>
                        <IconButton>
                            <Settings />
                        </IconButton>
                    </Link>
                </>
            }
        >
            <MachineList machines={machines} onClick={handleMachineClick} />
        </TrainingContainer>
    ) : null;

    function handleMachineClick(machine: Row<'Machine'>) {
        if (!plan) {
            return;
        }
        router.push(`/training/machines/${machine.id}?fromPlan=${plan.id}`);
    }

    async function getPlanMachines(planId: number) {
        const planMachines = await dbInstance.PlanMachine.where('planId')
            .equals(planId)
            .toArray();

        if (planMachines.length === 0) {
            return [];
        }

        const machineIds = planMachines.map((pm) => pm.machineId);
        const machines = await dbInstance.Machine.where('id')
            .anyOf(machineIds)
            .toArray();

        const machineMap = new Map(machines.map((m) => [m.id, m]));
        return planMachines
            .sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0))
            .map((pm) => machineMap.get(pm.machineId))
            .filter((m): m is Row<'Machine'> => m !== undefined);
    }
}
