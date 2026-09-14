'use client';

import { FitnessCenter as GymIcon } from '@mui/icons-material';
import { Box } from '@mui/material';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export interface GymCalendarProps {
    gymDates?: string[];
}

const defaultGymDates = [
    '2026-09-01',
    '2026-09-03',
    '2026-09-05',
    '2026-09-08',
    '2026-09-10',
    '2026-09-12',
    '2026-09-14',
];

function formatDateKey(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export default function GymCalendar({
    gymDates = defaultGymDates,
}: GymCalendarProps) {
    const [value, setValue] = useState<Date | null>(new Date());

    const tileContent = ({ date, view }: { date: Date; view: string }) => {
        if (view === 'month' && gymDates.includes(formatDateKey(date))) {
            return (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        lineHeight: 1,
                        mt: 0.25,
                    }}
                >
                    <GymIcon sx={{ fontSize: 12, color: 'success.main' }} />
                </Box>
            );
        }
        return null;
    };

    return (
        <Box
            sx={{
                width: '100%',
                bgcolor: 'transparent',
                '& .react-calendar': {
                    width: '100%',
                    border: 'none',
                    bgcolor: 'transparent !important',
                    background: 'none !important',
                    fontFamily: 'inherit',
                    color: 'inherit',
                },
                '& .react-calendar__navigation button': {
                    color: 'inherit',
                    bgcolor: 'transparent !important',
                    '&:enabled:hover, &:enabled:focus': {
                        bgcolor: 'action.hover !important',
                    },
                },
                '& .react-calendar__month-view__weekdays': {
                    color: 'text.secondary',
                },
                '& .react-calendar__month-view__weekdays__weekday abbr': {
                    textDecoration: 'none',
                },
                '& .react-calendar__tile': {
                    color: 'inherit',
                    bgcolor: 'transparent !important',
                    background: 'none !important',
                    '&:enabled:hover, &:enabled:focus': {
                        bgcolor: 'action.hover !important',
                    },
                },
                '& .react-calendar__tile--now': {
                    bgcolor: 'action.selected !important',
                },
                '& .react-calendar__tile--active': {
                    bgcolor: 'primary.main !important',
                    color: 'primary.contrastText !important',
                },
                '& .react-calendar__tile--active .MuiSvgIcon-root': {
                    color: 'primary.contrastText',
                },
            }}
        >
            <Calendar
                onChange={(val) => setValue(val as Date)}
                value={value}
                tileContent={tileContent}
            />
        </Box>
    );
}
