'use client';

import { BlobImage } from '@/components/BlobImage';
import { Row } from '@/database/db';
import { Card, Stack, Typography } from '@mui/material';
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
                </Stack>
            </Card>
        </Link>
    );
}
