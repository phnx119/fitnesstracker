'use client';

import { Row } from '@/database/db';
import { Card, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function PlanCard({ plan }: { plan: Row<'WorkoutPlan'> }) {
    const pathName = usePathname();
    return (
        <Link href={`${pathName}/${plan.id}`}>
            <Card>
                <Stack direction="row" sx={{ alignItems: 'center', p: 2 }}>
                    <Typography>{plan.name}</Typography>
                </Stack>
            </Card>
        </Link>
    );
}
