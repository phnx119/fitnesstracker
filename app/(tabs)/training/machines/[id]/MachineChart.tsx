'use client';

import { useChartOverlay } from '@/app/_helpers/useChartOverlay';
import { Row } from '@/database/db';
import { Box, Card, Divider, Stack, Typography } from '@mui/material';
import { Dispatch, SetStateAction, useMemo, useRef } from 'react';

export type SessionWithSets = {
    id: number;
    machineId: number;
    date: number;
    setRecords: Row<'SetRecord'>[];
};

export default function MachineChart({
    data,
    setActiveSessionId,
}: {
    data: SessionWithSets[];
    setActiveSessionId: Dispatch<SetStateAction<number | null>>;
}) {
    const containerRef = useRef<HTMLDivElement>(null);

    const chart1 = useChartOverlay({
        containerRef,
        attributeName: 'data-set-0',
        lineColor: '#00e676',
        tension: 1,
        fillBelowBackground:
            'linear-gradient(0deg, rgba(255, 23, 68, 0) 0%, #9a9a9a5a 100%)',
    });

    const chart2 = useChartOverlay({
        containerRef,
        attributeName: 'data-set-1',
        lineColor: '#29b6f6',
        tension: 1,
        fillBelowBackground:
            'linear-gradient(0deg, rgba(255, 23, 68, 0) 0%, #9a9a9a5a 100%)',
    });

    const chart3 = useChartOverlay({
        containerRef,
        attributeName: 'data-set-2',
        lineColor: '#ff1744',
        tension: 1,
        fillBelowBackground:
            'linear-gradient(0deg, rgba(255, 23, 68, 0) 0%, #9a9a9a5a 100%)',
    });

    const maxWeight = useMemo(() => {
        return Math.max(
            0,
            ...data.flatMap((item) => item.setRecords.map((r) => r.weight)),
        );
    }, [data]);

    const maxHeightPercent = 99;

    function getRegisterRef(setIndex: number) {
        if (setIndex === 0) return chart1.registerPointRef;
        if (setIndex === 1) return chart2.registerPointRef;
        if (setIndex === 2) return chart3.registerPointRef;
        return null;
    }

    return (
        <Stack sx={{ flex: 1, overflow: 'auto' }}>
            <Card sx={{ flex: 1, p: 1, overflow: 'hidden' }}>
                <Box
                    ref={containerRef}
                    sx={{
                        flex: 1,
                        height: '100%',
                        position: 'relative',
                        overflow: 'auto',
                    }}
                >
                    {chart1.backgroundOverlay}
                    {chart2.backgroundOverlay}
                    {chart3.backgroundOverlay}

                    {chart1.linesOverlay}
                    {chart2.linesOverlay}
                    {chart3.linesOverlay}

                    <Stack
                        sx={{
                            height: '100%',
                            gap: 1,
                            minWidth: '100%',
                            width: 'max-content',
                        }}
                        direction="row"
                        divider={<Divider orientation="vertical" flexItem />}
                    >
                        {data.map((session) => (
                            <Stack
                                key={session.id}
                                sx={{ height: '100%', zIndex: 1 }}
                                onClick={() => setActiveSessionId(session.id)}
                            >
                                <Stack
                                    sx={{
                                        flex: 1,
                                        minHeight: 0,
                                        gap: 1,
                                        alignItems: 'flex-end',
                                    }}
                                    direction="row"
                                >
                                    {session.setRecords.map((set, setIndex) => {
                                        const registerRef =
                                            getRegisterRef(setIndex);
                                        const calculatedHeight =
                                            maxWeight > 0
                                                ? (set.weight / maxWeight) *
                                                  maxHeightPercent
                                                : 0;

                                        return (
                                            <Stack
                                                key={set.id}
                                                ref={(el) =>
                                                    registerRef?.(set.id, el)
                                                }
                                                sx={{
                                                    height: `${calculatedHeight}%`,
                                                    minHeight: 0,
                                                    justifyContent: 'flex-end',
                                                    alignItems: 'center',
                                                    minWidth: 25,
                                                    gap: 0.5,
                                                    pb: 0.5,
                                                    overflow: 'hidden',
                                                }}
                                            >
                                                <Typography
                                                    sx={{ fontSize: 14 }}
                                                >
                                                    {set.weight}
                                                </Typography>
                                                <Typography
                                                    sx={{ fontSize: 10 }}
                                                >
                                                    {set.reps}
                                                </Typography>
                                            </Stack>
                                        );
                                    })}
                                </Stack>
                                <Typography
                                    sx={{
                                        fontSize: 10,
                                        textAlign: 'center',
                                        py: 0.5,
                                    }}
                                >
                                    {new Date(session.date).toLocaleDateString(
                                        'de-DE',
                                        {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: '2-digit',
                                        },
                                    )}
                                </Typography>
                            </Stack>
                        ))}
                    </Stack>
                </Box>
            </Card>
        </Stack>
    );
}
