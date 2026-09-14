'use client';

import { dbInstance } from '@/database/db';
import { Box } from '@mui/material';
import { useLiveQuery } from 'dexie-react-hooks';
import { useMemo } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export interface GymCalendarProps {
    gymDates?: string[];
}

function formatDateKey(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export default function GymCalendar({ gymDates }: GymCalendarProps) {
    // 1. Subscribe to live updates from Dexie MachineSession
    const liveSessions = useLiveQuery(async () => {
        return await dbInstance.MachineSession.toArray();
    }, []);

    // 2. Convert Date.now() millisecond timestamps to local YYYY-MM-DD keys
    const activeDateSet = useMemo(() => {
        if (gymDates) {
            return new Set(gymDates);
        }

        if (!liveSessions) {
            return new Set<string>();
        }

        const dateKeys = liveSessions
            .filter((session) => Boolean(session.date))
            .map((session) => formatDateKey(new Date(session.date)));

        return new Set(dateKeys);
    }, [gymDates, liveSessions]);

    // 3. Tile class assigner using Set.has() O(1) lookup
    const tileClassName = ({ date, view }: { date: Date; view: string }) => {
        if (view === 'month' && activeDateSet.has(formatDateKey(date))) {
            return 'gym-day';
        }
        return '';
    };

    // 4. Force react-calendar to re-render tile DOM when DB dates finish loading
    const calendarKey = Array.from(activeDateSet).sort().join(',');

    return (
        <Box
            sx={(theme) => ({
                width: '100%',
                bgcolor: 'transparent',

                // 1. Transparent background container & navigation controls
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

                // 2. Disable clicking on the month/year header title
                '& .react-calendar__navigation__label': {
                    pointerEvents: 'none',
                    cursor: 'default',
                },

                // 3. Weekdays header
                '& .react-calendar__month-view__weekdays': {
                    color: theme.palette.text.secondary,
                },
                '& .react-calendar__month-view__weekdays__weekday abbr': {
                    textDecoration: 'none',
                },

                // 4. Disable click & interaction on standard day tiles
                '& .react-calendar__tile': {
                    color: 'inherit',
                    background: 'transparent !important',
                    borderRadius: '8px',
                    pointerEvents: 'none',
                    cursor: 'default',
                },

                // 5. Highlight Gym Days
                '& .react-calendar__tile.gym-day': {
                    backgroundColor: `${theme.palette.primary.main} !important`,
                    color: `${theme.palette.primary.contrastText} !important`,
                    fontWeight: 'bold',
                },

                // 6. Override click/active highlight styles
                '& .react-calendar__tile--active': {
                    backgroundColor: 'transparent !important',
                    color: 'inherit !important',
                },
                '& .react-calendar__tile--active.gym-day': {
                    backgroundColor: `${theme.palette.primary.main} !important`,
                    color: `${theme.palette.primary.contrastText} !important`,
                },

                // 7. Border indicator for today's date
                '& .react-calendar__tile--now': {
                    border: `1px solid ${theme.palette.primary.main}`,
                },
            })}
        >
            <Calendar
                key={calendarKey}
                tileClassName={tileClassName}
                minDetail="month"
                maxDetail="month"
            />
        </Box>
    );
}
