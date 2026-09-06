'use client';

import Header from '@/components/Header';
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
} from '@mui/material';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { PropsWithChildren } from 'react';
import { CS_MAPS } from './maps';
import SideSwitch from './SideSwitch';

export default function CsLayout({ children }: PropsWithChildren) {
    const router = useRouter();
    const pathName = usePathname();

    const segments = pathName.split('/').filter(Boolean);
    const currentMap = segments[1] || 'mirage';
    const currentSide = (segments[2] as 't' | 'ct') || 't';

    return (
        <Stack sx={{ flex: 1, overflow: 'auto' }}>
            <Header showHome>
                <Stack
                    direction="row"
                    sx={{ minWidth: 260, gap: 2, alignItems: 'center' }}
                >
                    <FormControl size="small" fullWidth>
                        <InputLabel id="map-select-label">Map</InputLabel>
                        <Select
                            labelId="map-select-label"
                            id="map-select"
                            value={currentMap}
                            label="Map"
                            onChange={handleMapChange}
                        >
                            {CS_MAPS.map((map) => (
                                <MenuItem key={map.id} value={map.path}>
                                    <Stack
                                        direction="row"
                                        sx={{
                                            gap: 1,
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Image
                                            src={map.image}
                                            alt=""
                                            width={25}
                                            height={25}
                                        />
                                        {map.name}
                                    </Stack>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <SideSwitch
                        side={currentSide}
                        onChange={handleSideChange}
                    />
                </Stack>
            </Header>

            <Stack sx={{ flex: 1, overflow: 'auto' }}>{children}</Stack>
        </Stack>
    );

    function handleMapChange(event: SelectChangeEvent) {
        const newMap = event.target.value;
        router.push(`/cs/${newMap}/${currentSide}`);
    }

    function handleSideChange(newSide: 't' | 'ct') {
        router.push(`/cs/${currentMap}/${newSide}`);
    }
}
