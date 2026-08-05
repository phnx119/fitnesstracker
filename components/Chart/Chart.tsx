import { Row } from '@/database/db';
import { Card, Stack, Typography } from '@mui/material';

export default function Chart({
    data,
}: {
    data: ({
        machineId: number;
        date: string;
    } & {
        id: number;
    } & {
        setRecords: Row<'SetRecord'>[];
    })[];
}) {
    return (
        <Stack sx={{ flex: 1, overflow: 'auto' }}>
            <Card sx={{ flex: 1, overflow: 'auto' }}>
                <Stack
                    sx={{ flex: 1, gap: 1, overflow: 'auto', height: '100%' }}
                    direction="row"
                >
                    {data.map((session) => (
                        <Stack key={session.id} sx={{ height: '100%' }}>
                            <Stack
                                sx={{
                                    gap: 1,
                                    height: '100%',
                                    bgcolor: 'green',
                                }}
                                direction="row"
                            >
                                {session.setRecords.map((set) => (
                                    <Stack
                                        key={set.id}
                                        sx={{
                                            height: '100%',
                                            bgcolor: 'red',
                                        }}
                                    >
                                        <Typography>{set.weight}</Typography>
                                    </Stack>
                                ))}
                            </Stack>
                        </Stack>
                    ))}
                </Stack>
            </Card>
        </Stack>
    );
}
