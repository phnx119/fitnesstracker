import { Row } from '@/database/db';
import { Card, Divider, Stack, Typography } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

export default function Chart({
    data,
    setActiveSessionId,
}: {
    data: ({
        machineId: number;
        date: number;
    } & {
        id: number;
    } & {
        setRecords: Row<'SetRecord'>[];
    })[];
    setActiveSessionId: Dispatch<SetStateAction<number | null>>;
}) {
    const maxWeight = Math.max(
        ...data.flatMap((item) =>
            item.setRecords.map((record) => record.weight),
        ),
    );
    return (
        <Stack sx={{ flex: 1, overflow: 'auto' }}>
            <Card sx={{ flex: 1, overflow: 'auto', p: 1 }}>
                <Stack
                    sx={{ flex: 1, gap: 1, overflow: 'auto', height: '100%' }}
                    direction="row"
                    divider={<Divider orientation="vertical" />}
                >
                    {data.map((session) => (
                        <Stack
                            key={session.id}
                            sx={{ height: '100%' }}
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
                                        (set.weight / maxWeight) * 100;
                                    return (
                                        <Stack
                                            key={set.id}
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

                                            <Typography sx={{ fontSize: 13 }}>
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
            </Card>
        </Stack>
    );
}
