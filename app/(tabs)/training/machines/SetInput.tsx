import NumberField from '@/components/NumberField';
import { dbInstance } from '@/database/db';
import { Stack } from '@mui/material';
import { useLiveQuery } from 'dexie-react-hooks';

export default function SetInput({ setId }: { setId: number }) {
    const setData = useLiveQuery(() => dbInstance.SetRecord.get(setId));
    return (
        <Stack direction="row" sx={{ gap: 2 }}>
            <NumberField
                label="Reps"
                value={setData?.reps ?? 12}
                onValueChange={(e) => updateReps(e)}
                showButtons
            />
            <NumberField
                label="Weight"
                value={setData?.weight ?? 0}
                onValueChange={(e) => updateWeight(e)}
                showButtons
            />
        </Stack>
    );

    function updateWeight(newValue: number | null) {
        if (!newValue) {
            return;
        }
        dbInstance.SetRecord.update(setId, {
            weight: newValue,
        });
    }

    function updateReps(newValue: number | null) {
        if (!newValue) {
            return;
        }
        dbInstance.SetRecord.update(setId, {
            reps: newValue,
        });
    }
}
