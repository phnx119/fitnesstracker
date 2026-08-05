import { Row } from '@/database/db';
import { Card, Stack, Typography } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

export default function Chart({
    data,
    setActiveSessionId,
}: {
    data: ({
        machineId: number;
        date: string;
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
            <Card sx={{ flex: 1, overflow: 'auto' }}>
                <Stack
                    sx={{ flex: 1, gap: 1, overflow: 'auto', height: '100%' }}
                    direction="row"
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
                                }}
                                direction="row"
                            >
                                {session.setRecords.map((set) => {
                                    const calculatedHeight = 1;
                                    return (
                                        <Stack
                                            key={set.id}
                                            sx={{
                                                height: '100%',
                                                bgcolor: 'red',
                                            }}
                                        >
                                            <Typography>
                                                {set.weight}
                                            </Typography>
                                        </Stack>
                                    );
                                })}
                            </Stack>
                            <Typography
                                sx={{ fontSize: 10, textAlign: 'center' }}
                            >
                                {session.date}
                            </Typography>
                        </Stack>
                    ))}
                </Stack>
            </Card>
        </Stack>
    );
}
