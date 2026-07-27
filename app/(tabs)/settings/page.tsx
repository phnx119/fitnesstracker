'use client';

import { dbInstance } from '@/database/db';
import { Card, FormControlLabel, Stack, Switch } from '@mui/material';
import { useLiveQuery } from 'dexie-react-hooks';

export default function Settings() {
    const settings = useLiveQuery(() => dbInstance.Settings.get(1));
    const showDbViewer = settings?.showDbViewer ?? false;

    async function handleToggle(event: React.ChangeEvent<HTMLInputElement>) {
        const newValue = event.target.checked;

        await dbInstance.Settings.update(1, {
            showDbViewer: newValue,
        });
    }

    return (
        <Stack sx={{ flex: 1, gap: 1 }}>
            <Card sx={{ p: 2 }}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={showDbViewer}
                            onChange={handleToggle}
                        />
                    }
                    label="Show Database Viewer"
                />
            </Card>
        </Stack>
    );
}
