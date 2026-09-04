'use client';

import Header from '@/components/Header';
import { dbInstance, Row } from '@/database/db';
import { Stack } from '@mui/material';
import { useLiveQuery } from 'dexie-react-hooks';
import { useParams } from 'next/navigation';
import MachineList from '../../../machines/MachineList';

export default function AddMachine() {
    const planTable = dbInstance.WorkoutPlan;

    const { id: idString } = useParams<{ id: string }>();
    const planId = Number(idString);
    const plan = useLiveQuery(() => planTable.get(planId));

    const machines = useLiveQuery(() => dbInstance.Machine.toArray()) ?? [];
    const selectedMachineIds =
        useLiveQuery(
            () =>
                dbInstance.PlanMachine.where('planId').equals(planId).toArray(),
            [planId],
        )?.map((item) => item.machineId) ?? [];

    return plan ? (
        <>
            <Header title={`Select Machines for ${plan.name}`} />
            <Stack sx={{ p: 1, overflow: 'auto' }}>
                <MachineList
                    machines={machines}
                    onClick={handleSelect}
                    selectedIds={selectedMachineIds}
                />
            </Stack>
        </>
    ) : null;

    async function handleSelect(machine: Row<'Machine'>) {
        if (!plan) {
            return;
        }

        const existing = await dbInstance.PlanMachine.where('planId')
            .equals(plan.id)
            .and((pm) => pm.machineId === machine.id)
            .first();

        if (existing) {
            await dbInstance.PlanMachine.delete(existing.id);
        } else {
            await dbInstance.PlanMachine.add({
                planId: plan.id,
                machineId: machine.id,
                orderIndex: selectedMachineIds.length + 1,
            });
        }
    }
}
