import SideNav from '@/app/_helpers/SideNav';
import { Stack } from '@mui/material';
import HomeWidgetCard from './HomeWidgetCard';

export default function Home() {
    return (
        <Stack sx={{ flex: 1, overflow: 'auto' }} direction="row">
            <Stack sx={{ flex: 1, overflow: 'auto', p: 1 }}>
                <HomeWidgetCard title="Last used Plans"></HomeWidgetCard>
                <Stack sx={{ flex: 4 }}></Stack>
            </Stack>
            <SideNav />
        </Stack>
    );
}
