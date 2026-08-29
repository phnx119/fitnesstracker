'use client';

import { dbInstance } from '@/database/db';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import StorageIcon from '@mui/icons-material/Storage';
import {
    BottomNavigation,
    BottomNavigationAction,
    Divider,
    Stack,
} from '@mui/material';
import { useLiveQuery } from 'dexie-react-hooks';
import { usePathname, useRouter } from 'next/navigation';
import { useMemo } from 'react';

export const FIXED_NAV_ITEMS = [
    {
        label: 'Settings',
        path: '/settings',
        icon: <SettingsIcon />,
    },
    {
        label: 'Training',
        path: '/training/plans',
        icon: <FitnessCenterIcon />,
    },
    {
        label: 'Personal',
        path: '/personal',
        icon: <PersonIcon />,
    },
];

export default function BottomNav() {
    const router = useRouter();
    const pathname = usePathname();

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

    const activeIndex = useMemo(() => {
        const index = NAV_ITEMS.findIndex((item) =>
            pathname.startsWith(item.path),
        );
        return index !== -1 ? index : 1;
    }, [pathname, NAV_ITEMS]);

    return (
        <Stack
            sx={{
                paddingBottom: 'env(safe-area-inset-bottom, 0px)',
                backgroundColor: 'background.paper',
            }}
        >
            <Divider />
            <BottomNavigation
                value={activeIndex}
                onChange={handleNavigation}
                showLabels
                sx={{ backgroundColor: 'background.paper' }}
            >
                {NAV_ITEMS.map((item) => (
                    <BottomNavigationAction
                        key={item.path}
                        label={item.label}
                        icon={item.icon}
                        onTouchStart={() => router.prefetch(item.path)}
                    />
                ))}
            </BottomNavigation>
        </Stack>
    );

    function handleNavigation(_event: React.SyntheticEvent, newValue: number) {
        const targetPath = NAV_ITEMS[newValue]?.path;
        if (targetPath && targetPath !== pathname) {
            router.push(targetPath);
        }
    }
}
