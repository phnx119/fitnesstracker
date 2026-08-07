import { dbInstance, Row } from '@/database/db';
import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material';
import { useLiveQuery } from 'dexie-react-hooks';
import MachineList from '../../machines/MachineList';

export default function MachineSelect({
    plan,
    onClose,
}: {
    plan: Row<'WorkoutPlan'>;
    onClose(): void;
}) {
    const machines = useLiveQuery(() => dbInstance.Machine.toArray()) ?? [];
    const selectedMachineIds =
        useLiveQuery(() => dbInstance.PlanMachine.toArray())?.map(
            (item) => item.machineId,
        ) ?? [];
    return (
        <>
            <DialogTitle>Select Machines for {plan.name}</DialogTitle>
            <DialogContent>
                <MachineList
                    machines={machines}
                    onClick={handleSelect}
                    selectedIds={selectedMachineIds}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </>
    );

    async function handleSelect(machine: Row<'Machine'>) {
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
