'use client';

import { FIXED_NAV_ITEMS } from '@/app/components/navigation/BottomNav';
import TabContentStack from '@/components/TabContentStack';
import { dbInstance } from '@/database/db';
import {
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Switch,
} from '@mui/material';
import { useLiveQuery } from 'dexie-react-hooks';
import SettingsGroup from './SettingsGroup';

export default function Settings() {
    const settings = useLiveQuery(() => dbInstance.Settings.get(1));
    const showDbViewer = settings?.showDbViewer ?? false;
    const landingPage = settings?.landingPage ?? '/training';

    return (
        <TabContentStack>
            <SettingsGroup>
                <FormControl>
                    <InputLabel id="landingPageLabel">Landing Page</InputLabel>
                    <Select
                        label="Landing Page"
                        labelId="landingPageLabel"
                        value={landingPage}
                        onChange={handleLandingPageSelect}
                    >
                        {FIXED_NAV_ITEMS.map((item) => (
                            <MenuItem key={item.path} value={item.path}>
                                {item.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControlLabel
                    control={
                        <Switch
                            checked={showDbViewer}
                            onChange={handleToggle}
                        />
                    }
                    label="Show Database Viewer"
                />
            </SettingsGroup>
        </TabContentStack>
    );

    async function handleLandingPageSelect(e: SelectChangeEvent) {
        await dbInstance.Settings.update(1, {
            landingPage: e.target.value,
        });
    }

    async function handleToggle(event: React.ChangeEvent<HTMLInputElement>) {
        const newValue = event.target.checked;

        await dbInstance.Settings.update(1, {
            showDbViewer: newValue,
        });
    }
}
