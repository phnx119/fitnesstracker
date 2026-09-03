import SideNav from '@/app/_helpers/SideNav';
import { Stack, TextField } from '@mui/material';

export default function Home() {
    return (
        <Stack sx={{ flex: 1, overflow: 'auto' }} direction="row">
            <Stack sx={{ flex: 1, overflow: 'auto' }}>
                <TextField></TextField>
            </Stack>
            <SideNav />
        </Stack>
    );
}
