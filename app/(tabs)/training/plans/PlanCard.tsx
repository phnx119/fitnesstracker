'use client';

import { BlobImage } from '@/components/BlobImage';
import { Row } from '@/database/db';
import { Box, Card, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function PlanCard({ plan }: { plan: Row<'WorkoutPlan'> }) {
    const pathName = usePathname();
    return (
        <Link href={`${pathName}/${plan.id}`}>
            <Card>
                <Stack
                    direction="row"
                    sx={{
                        alignItems: 'center',
                        p: 1,
                        gap: 3,
                        flex: 1,
                    }}
                >
                    <Stack sx={{ aspectRatio: 1, height: 80 }}>
                        <BlobImage blob={plan.imageBlob} />
                    </Stack>
                    <Typography>{plan.name}</Typography>

                    <Box sx={{ flex: 1 }} />

                    {plan.lastUsed && (
                        <Typography>
                            {new Date(plan.lastUsed).toLocaleDateString(
                                'de-DE',
                                {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: '2-digit',
                                },
                            )}
                        </Typography>
                    )}
                </Stack>
            </Card>
        </Link>
    );
}
