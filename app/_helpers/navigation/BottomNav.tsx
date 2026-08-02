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
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

export const FIXED_NAV_ITEMS = [
    {
        label: 'Training',
        path: '/training',
        icon: <FitnessCenterIcon />,
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

export default function BottomNav() {
    const router = useRouter();
    const pathname = usePathname();

    const [showDbViewer, setShowDbViewer] = useState(true);

    useEffect(() => {
        let mounted = true;

        (async () => {
            try {
                const settings = await dbInstance.Settings.get(1);
                if (mounted) {
                    setShowDbViewer(settings?.showDbViewer ?? true);
                }
            } catch {
                if (mounted) {
                    setShowDbViewer(true);
                }
            }
        })();

        return () => {
            mounted = false;
        };
    }, []);

    const NAV_ITEMS = useMemo(() => {
        const dbItem = showDbViewer
            ? [{ label: 'DB', path: '/dbviewer', icon: <StorageIcon /> }]
            : [];

        return [...FIXED_NAV_ITEMS, ...dbItem];
    }, [showDbViewer]);

    const activeIndex = useMemo(() => {
        const index = NAV_ITEMS.findIndex((item) =>
            pathname.startsWith(item.path),
        );
        return index !== -1 ? index : 0;
    }, [pathname, NAV_ITEMS]);

    return (
        <Stack>
            <Divider />

            <BottomNavigation
                value={activeIndex}
                onChange={handleNavigation}
                showLabels
                sx={{
                    backgroundColor: 'transparent',
                }}
            >
                {NAV_ITEMS.map((item) => (
                    <BottomNavigationAction
                        key={item.path}
                        label={item.label}
                        icon={item.icon}
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
