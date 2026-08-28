'use client';

import { FIXED_NAV_ITEMS } from '@/app/_helpers/BottomNav';
import Header from '@/components/Header';
import TabContentStack from '@/components/TabContentStack';
import { dbInstance } from '@/database/db';
import {
    Button,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    Switch,
} from '@mui/material';
import { useLiveQuery } from 'dexie-react-hooks';
import SettingsGroup from './SettingsGroup';

export default function Settings() {
    const settings = useLiveQuery(() => dbInstance.Settings.get(1));
    const showDbViewer = settings?.showDbViewer ?? false;
    const bigScreenMode = settings?.bigScreenMode ?? true;
    const landingPage = settings?.landingPage ?? '/training/plans';

    const progressMetricOptions = ['Weight', 'E1RM'];
    const progressMetric = settings?.progressMetric ?? 0;

    return (
        <Stack>
            <Header title="Hier wird gezwirbelt" />

            <TabContentStack>
                <Stack sx={{ overflow: 'auto', gap: 1 }}>
                    <SettingsGroup>
                        <FormControl>
                            <InputLabel id="landingPageLabel">
                                Landing Page
                            </InputLabel>
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
                                    onChange={toggleDbViewer}
                                />
                            }
                            label="Show Database Viewer"
                        />

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={!bigScreenMode}
                                    onChange={toggleBigScreen}
                                />
                            }
                            label="Small Screen Mode"
                        />
                    </SettingsGroup>

                    <SettingsGroup>
                        <FormControl>
                            <InputLabel id="progressMetricLabel">
                                Progress Metric
                            </InputLabel>
                            <Select
                                value={progressMetric}
                                label="Progress Metric"
                                labelId="progressMetricLabel"
                                onChange={(e) =>
                                    handleProgressMetricChange(e.target.value)
                                }
                            >
                                {progressMetricOptions.map((item, index) => (
                                    <MenuItem key={index} value={index}>
                                        {item}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </SettingsGroup>

                    <SettingsGroup>
                        <Button onClick={setupSettings}>Revert Settings</Button>
                    </SettingsGroup>
                </Stack>
            </TabContentStack>
        </Stack>
    );

    async function handleProgressMetricChange(value: number) {
        await dbInstance.Settings.update(1, {
            progressMetric: value,
        });
    }

    async function handleLandingPageSelect(e: SelectChangeEvent) {
        await dbInstance.Settings.update(1, {
            landingPage: e.target.value,
        });
    }

    async function toggleDbViewer(event: React.ChangeEvent<HTMLInputElement>) {
        const newValue = event.target.checked;

        await dbInstance.Settings.update(1, {
            showDbViewer: newValue,
        });
    }

    async function toggleBigScreen(event: React.ChangeEvent<HTMLInputElement>) {
        const newValue = !event.target.checked;

        await dbInstance.Settings.update(1, {
            bigScreenMode: newValue,
        });
    }

    async function setupSettings() {
        await dbInstance.Settings.put({
            id: 1,
            showDbViewer: true,
            bigScreenMode: true,
            landingPage: '/training/plans',
            progressMetric: 0,
        });
    }
}
