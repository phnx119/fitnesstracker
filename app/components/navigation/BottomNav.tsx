// components/navigation/BottomNav.tsx
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Paper, BottomNavigation, BottomNavigationAction } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  // Map paths to index values for MUI BottomNavigation
  const getIndexFromPath = (path: string) => {
    if (path.startsWith('/training')) return 0;
    if (path.startsWith('/personal')) return 1;
    if (path.startsWith('/settings')) return 2;
    return 0;
  };

  const currentIndex = getIndexFromPath(pathname);

  return (

      <BottomNavigation
        value={currentIndex}
        onChange={(_event, newValue) => {
          if (newValue === 0) router.push('/training');
          if (newValue === 1) router.push('/personal');
          if (newValue === 2) router.push('/settings');
        }}
        showLabels
      >
        <BottomNavigationAction label="Training" icon={<FitnessCenterIcon />} />
        <BottomNavigationAction label="Personal" icon={<PersonIcon />} />
        <BottomNavigationAction label="Settings" icon={<SettingsIcon />} />
      </BottomNavigation>
  );
}