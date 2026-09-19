'use client';

import SideNav from '@/app/_helpers/SideNav';
import { Stack } from '@mui/material';
import GymCalendar from './CalendarWidget';
import LastUsedPlans from './LastUsedPlans';

export default function Home() {
    return (
        <Stack sx={{ flex: 1, overflow: 'auto' }} direction="row">
            <Stack sx={{ flex: 1, overflow: 'auto', p: 1, gap: 1 }}>
                <LastUsedPlans />

                <GymCalendar />
            </Stack>
            <SideNav />
        </Stack>
    );
}
