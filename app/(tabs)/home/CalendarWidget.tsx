'use client';

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

    const tileClassName = ({ date, view }: { date: Date; view: string }) => {
        if (view === 'month' && gymDates.includes(formatDateKey(date))) {
            return 'gym-day';
        }
        return '';
    };

    return (
        <Box
            sx={(theme) => ({
                width: '100%',
                bgcolor: 'transparent',

                // 1. Remove white background from container & nav
                '& .react-calendar': {
                    width: '100%',
                    border: 'none',
                    background: 'transparent !important',
                    fontFamily: 'inherit',
                    color: 'inherit',
                },
                '& .react-calendar__navigation button': {
                    color: 'inherit',
                    background: 'transparent !important',
                    '&:enabled:hover, &:enabled:focus': {
                        backgroundColor: `${theme.palette.action.hover} !important`,
                    },
                },

                // 2. Base tile layout
                '& .react-calendar__month-view__weekdays': {
                    color: theme.palette.text.secondary,
                },
                '& .react-calendar__month-view__weekdays__weekday abbr': {
                    textDecoration: 'none',
                },
                '& .react-calendar__tile': {
                    color: 'inherit',
                    background: 'transparent !important',
                    borderRadius: '8px',
                    '&:enabled:hover, &:enabled:focus': {
                        backgroundColor: `${theme.palette.action.hover} !important`,
                    },
                },

                // 3. Highlight Gym Days & Active Selected Days with full background fill
                '& .react-calendar__tile.gym-day, & .react-calendar__tile--active':
                    {
                        backgroundColor: `${theme.palette.primary.main} !important`,
                        color: `${theme.palette.primary.contrastText} !important`,
                        fontWeight: 'bold',
                        '&:enabled:hover, &:enabled:focus': {
                            backgroundColor: `${theme.palette.primary.dark} !important`,
                        },
                    },

                // 4. Subtle outline for today's date if not a gym day
                '& .react-calendar__tile--now': {
                    border: `1px solid ${theme.palette.primary.main}`,
                },
            })}
        >
            <Calendar
                onChange={(val) => setValue(val as Date)}
                value={value}
                tileClassName={tileClassName}
            />
        </Box>
    );
}
