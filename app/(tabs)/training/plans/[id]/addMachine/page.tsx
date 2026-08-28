'use client';

import { dbInstance, Row } from '@/database/db';
import { Button, DialogContent, DialogTitle } from '@mui/material';
import { useLiveQuery } from 'dexie-react-hooks';
import { useParams, useRouter } from 'next/navigation';
import MachineList from '../../../machines/MachineList';

export default function AddMachine() {
    const router = useRouter();
    const planTable = dbInstance.WorkoutPlan;

    const { id: idString } = useParams<{ id: string }>();
    const planId = Number(idString);
    const plan = useLiveQuery(() => planTable.get(planId));

    const machines = useLiveQuery(() => dbInstance.Machine.toArray()) ?? [];
    const selectedMachineIds =
        useLiveQuery(() => dbInstance.PlanMachine.toArray())?.map(
            (item) => item.machineId,
        ) ?? [];

    return plan ? (
        <>
            <DialogTitle>Select Machines for {plan.name}</DialogTitle>
            <DialogContent>
                <MachineList
                    machines={machines}
                    onClick={handleSelect}
                    selectedIds={selectedMachineIds}
                />
            </DialogContent>

            <Button onClick={() => router.back()}>test</Button>
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
