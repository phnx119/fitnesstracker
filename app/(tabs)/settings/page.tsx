'use client';

import { FIXED_NAV_ITEMS } from '@/app/_helpers/navigation/BottomNav';
import {
    ensureOfflineReady,
    type OfflineStatus,
} from '@/app/_helpers/offline-data';
import Header from '@/components/Header';
import TabContentStack from '@/components/TabContentStack';
import { dbInstance } from '@/database/db';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
    Box,
    CircularProgress,
    FormControl,
    FormControlLabel,
    InputLabel,
    LinearProgress,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    Switch,
    Typography,
} from '@mui/material';
import { useLiveQuery } from 'dexie-react-hooks';
import { useEffect, useState } from 'react';
import SettingsGroup from './SettingsGroup';

export default function Settings() {
    const settings = useLiveQuery(() => dbInstance.Settings.get(1));
    const showDbViewer = settings?.showDbViewer ?? true;
    const landingPage = settings?.landingPage ?? '/training';
    const [offlineStatus, setOfflineStatus] = useState<OfflineStatus>({
        ready: false,
        step: 'Checking offline readiness',
        progress: 0,
    });

    useEffect(() => {
        void ensureOfflineReady(setOfflineStatus);
    }, []);

    return (
        <Stack sx={{ flex: 1 }}>
            <Header title="Hier wird gezwirbelt" />

            <TabContentStack>
                <SettingsGroup>
                    <Box
                        sx={{
                            p: 1.5,
                            borderRadius: 2,
                            bgcolor: 'action.hover',
                        }}
                    >
                        <Stack
                            direction="row"
                            spacing={1.5}
                            sx={{ alignItems: 'center' }}
                        >
                            {offlineStatus.ready ? (
                                <CheckCircleIcon
                                    color="success"
                                    sx={{ fontSize: 20 }}
                                />
                            ) : (
                                <CircularProgress size={20} thickness={5} />
                            )}
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="subtitle2">
                                    Offline ready
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {offlineStatus.step}
                                </Typography>
                            </Box>
                        </Stack>
                        <LinearProgress
                            variant="determinate"
                            value={offlineStatus.progress}
                            sx={{ mt: 1.5, height: 8, borderRadius: 999 }}
                        />
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ mt: 0.75, display: 'block' }}
                        >
                            {offlineStatus.ready
                                ? 'The app is ready to work without internet.'
                                : 'Preparing local data for offline use...'}
                        </Typography>
                    </Box>

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
                                onChange={handleToggle}
                            />
                        }
                        label="Show Database Viewer"
                    />
                </SettingsGroup>
            </TabContentStack>
        </Stack>
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
