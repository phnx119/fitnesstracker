'use client';

import { Switch, styled } from '@mui/material';
import { ChangeEvent } from 'react';

const T_ICON = '/csSideIcons/tSideIcon.webp';
const CT_ICON = '/csSideIcons/ctSideIcon.webp';

const StyledSwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
            transform: 'translateX(28px)',
            '& .MuiSwitch-thumb': {
                backgroundColor: '#2563eb',
                backgroundImage: `url(${CT_ICON})`,
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: 'rgba(37, 99, 235, 0.3)',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        width: 32,
        height: 32,
        backgroundColor: '#ea580c',
        backgroundImage: `url(${T_ICON})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        overflow: 'hidden',
        transition: theme.transitions.create(
            ['background-image', 'background-color'],
            { duration: 200 },
        ),
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: 'rgba(234, 88, 12, 0.3)',
        borderRadius: 20,
    },
}));

interface SideSwitchProps {
    side: string;
    onChange: (newSide: 't' | 'ct') => void;
}

export default function SideSwitch({ side, onChange }: SideSwitchProps) {
    const isCt = side === 'ct';

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.checked ? 'ct' : 't');
    };

    return (
        <StyledSwitch
            checked={isCt}
            onChange={handleChange}
            slotProps={{
                input: { 'aria-label': 'Team Side Switcher' },
            }}
        />
    );
}
