'use client';

import SideNav from '@/app/_helpers/SideNav';
import { Stack } from '@mui/material';
import LastUsedPlans from './LastUsedPlans';

export default function Home() {
    return (
        <Stack sx={{ flex: 1, overflow: 'auto' }} direction="row">
            <Stack sx={{ flex: 1, overflow: 'auto', p: 1 }}>
                <Stack sx={{ flex: 1, overflow: 'auto' }}>
                    <LastUsedPlans />
                </Stack>
                <Stack sx={{ flex: 4 }}></Stack>
            </Stack>
            <SideNav />
        </Stack>
    );
}
