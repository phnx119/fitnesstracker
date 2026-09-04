'use client';

import { dbInstance } from '@/database/db';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import FlareIcon from '@mui/icons-material/Flare';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import StorageIcon from '@mui/icons-material/Storage';
import { BottomNavigationAction, Divider, Stack } from '@mui/material';
import { useLiveQuery } from 'dexie-react-hooks';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

export const FIXED_NAV_ITEMS = [
    {
        label: 'Training',
        path: '/training/plans',
        icon: <FitnessCenterIcon />,
    },
    {
        label: 'CS',
        path: '/cs/mirage/t',
        icon: <FlareIcon />,
    },
    {
        label: 'Personal',
        path: '/personal',
        icon: <PersonIcon />,
    },
    {
        label: 'Settings',
        path: '/settings',
        icon: <SettingsIcon />,
    },
];

export default function SideNav() {
    const router = useRouter();

    const showDbViewer =
        useLiveQuery(() => dbInstance.Settings.get(1))?.showDbViewer ?? true;

    const NAV_ITEMS = useMemo(
        () => [
            ...FIXED_NAV_ITEMS,
            ...(showDbViewer
                ? [{ label: 'DB', path: '/dbviewer', icon: <StorageIcon /> }]
                : []),
        ],
        [showDbViewer],
    );

    return (
        <Stack
            sx={{
                backgroundColor: 'background.paper',
            }}
            direction="row"
        >
            <Divider orientation="vertical" />

            <Stack>
                {NAV_ITEMS.map((item) => (
                    <BottomNavigationAction
                        key={item.path}
                        label={item.label}
                        icon={item.icon}
                        onTouchStart={() => router.prefetch(item.path)}
                        onClick={() => router.push(item.path)}
                    />
                ))}
            </Stack>
        </Stack>
    );
}
