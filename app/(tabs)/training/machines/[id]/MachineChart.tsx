import { useChartOverlay } from '@/app/_helpers/useChartOverlay';
import { Row } from '@/database/db';
import { Box, Card, Divider, Stack, Typography } from '@mui/material';
import { Dispatch, SetStateAction, useMemo } from 'react';

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
    const pointIds = useMemo(
        () =>
            data.flatMap((session) => session.setRecords.map((set) => set.id)),
        [data],
    );

    const { containerRef, registerPointRef, overlay } = useChartOverlay(
        pointIds,
        {
            lineColor: '#ffffff',
            lineWidth: 2.5,
            pointRadius: 3,
            tension: 1,
            fillBelowBackground:
                'linear-gradient(0deg,rgba(0, 0, 0, 0) 20%, rgba(0, 212, 255, 1) 100%)',
        },
    );

    const maxWeight = useMemo(() => {
        return Math.max(
            0,
            ...data.flatMap((item) => item.setRecords.map((r) => r.weight)),
        );
    }, [data]);

    const maxHeightPercent = 99;

    return (
        <Stack sx={{ flex: 1, overflow: 'auto' }}>
            <Card sx={{ flex: 1, p: 1, overflow: 'hidden' }}>
                {/* Scroll container ref attached here */}
                <Box
                    ref={containerRef}
                    sx={{
                        flex: 1,
                        height: '100%',
                        position: 'relative',
                        overflow: 'auto',
                    }}
                >
                    {/* Overlay rendered as sibling to Stack so Stack dividers ignore it */}
                    {overlay}

                    <Stack
                        sx={{
                            height: '100%',
                            gap: 1,
                            minWidth: 'max-content',
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
                                        bgcolor: 'green',
                                        alignItems: 'flex-end',
                                    }}
                                    direction="row"
                                >
                                    {session.setRecords.map((set) => {
                                        const calculatedHeight =
                                            maxWeight > 0
                                                ? (set.weight / maxWeight) *
                                                  maxHeightPercent
                                                : 0;

                                        return (
                                            <Stack
                                                key={set.id}
                                                ref={(el) =>
                                                    registerPointRef(set.id, el)
                                                }
                                                sx={{
                                                    height: `${calculatedHeight}%`,
                                                    minHeight: 0,
                                                    bgcolor: 'red',
                                                    justifyContent: 'flex-end',
                                                    alignItems: 'center',
                                                    minWidth: 25,
                                                    gap: 0.5,
                                                    pb: 0.5,
                                                    overflow: 'hidden',
                                                }}
                                            >
                                                <Typography
                                                    sx={{ fontSize: 11 }}
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
