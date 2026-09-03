'use client';

import { dbInstance } from '@/database/db';
import { Apps } from '@mui/icons-material';
import { Button, IconButton, Stack } from '@mui/material';
import { useLiveQuery } from 'dexie-react-hooks';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import TrainingContainer from '../TrainingContainer';
import PlanCard from './PlanCard';

export default function PlanListPage() {
    const plans = useLiveQuery(() => dbInstance.WorkoutPlan.toArray()) ?? [];
    const router = useRouter();
    const pathName = usePathname();

    return (
        <TrainingContainer
            title="Hier wird gemaust"
            headerButtons={
                <Link href={'/training/machines'}>
                    <IconButton>
                        <Apps />
                    </IconButton>
                </Link>
            }
            showHome
        >
            <Stack sx={{ overflow: 'auto', gap: 1, mb: 1 }}>
                {plans.map((item) => (
                    <PlanCard key={item.id} plan={item} />
                ))}
            </Stack>
            <Button onClick={() => router.push(`${pathName}/createPlan`)}>
                Create Plan
            </Button>
        </TrainingContainer>
    );
}
