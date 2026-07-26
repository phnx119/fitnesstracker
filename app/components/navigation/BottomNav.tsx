'use client';

import { dbInstance } from '@/database/db';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import StorageIcon from '@mui/icons-material/Storage';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { useLiveQuery } from 'dexie-react-hooks';
import { usePathname, useRouter } from 'next/navigation';
import { useMemo } from 'react';

export default function BottomNav() {
    const showDbViewer =
        useLiveQuery(() => dbInstance.Settings.get(1))?.showDbViewer ?? false;

    const NAV_ITEMS = [
        { label: 'Training', path: '/training', icon: <FitnessCenterIcon /> },
        { label: 'Personal', path: '/personal', icon: <PersonIcon /> },
        { label: 'Settings', path: '/settings', icon: <SettingsIcon /> },
        ...(showDbViewer
            ? [{ label: 'DB', path: '/dbviewer', icon: <StorageIcon /> }]
            : []),
    ] as const;

    const router = useRouter();
    const pathname = usePathname();

    // Berechnet den aktiven Index effizient & sauber
    const activeIndex = useMemo(() => {
        const index = NAV_ITEMS.findIndex((item) =>
            pathname.startsWith(item.path),
        );
        return index !== -1 ? index : 0;
    }, [pathname]);

    const handleNavigation = (
        _event: React.SyntheticEvent,
        newValue: number,
    ) => {
        const targetPath = NAV_ITEMS[newValue]?.path;
        if (targetPath && targetPath !== pathname) {
            router.push(targetPath);
        }
    };

    return (
        <BottomNavigation
            value={activeIndex}
            onChange={handleNavigation}
            showLabels
            sx={{
                // Hintergrund transparent halten, da Paper bereits styled
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
    );
}
