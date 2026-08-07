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
        },
    );

    const maxWeight = useMemo(() => {
        return Math.max(
            0,
            ...data.flatMap((item) => item.setRecords.map((r) => r.weight)),
        );
    }, [data]);

    const maxHeightPercent = 98;

    return (
        <Stack sx={{ flex: 1, overflow: 'auto' }}>
            <Card sx={{ flex: 1, p: 1, overflow: 'hidden' }}>
                <Box
                    sx={{
                        flex: 1,
                        height: '100%',
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                >
                    <Stack
                        ref={containerRef}
                        sx={{
                            flex: 1,
                            gap: 1,
                            overflow: 'auto',
                            height: '100%',
                            position: 'relative',
                        }}
                        direction="row"
                        divider={<Divider orientation="vertical" />}
                    >
                        {overlay}
                        {data.map((session) => (
                            <Stack
                                key={session.id}
                                sx={{ height: '100%', zIndex: 1 }}
                                onClick={() => setActiveSessionId(session.id)}
                            >
                                <Stack
                                    sx={{
                                        gap: 1,
                                        height: '100%',
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
                                                    bgcolor: 'red',
                                                    justifyContent: 'flex-end',
                                                    alignItems: 'center',
                                                    minWidth: 25,
                                                    gap: 1,
                                                    pb: 1,
                                                }}
                                            >
                                                <Typography>
                                                    {set.weight}
                                                </Typography>
                                                <Typography
                                                    sx={{ fontSize: 13 }}
                                                >
                                                    {set.reps}
                                                </Typography>
                                            </Stack>
                                        );
                                    })}
                                </Stack>
                                <Typography
                                    sx={{ fontSize: 10, textAlign: 'center' }}
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
