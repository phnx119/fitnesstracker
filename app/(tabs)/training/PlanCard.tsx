import { Row } from '@/database/db';
import { Card, Stack, Typography } from '@mui/material';

export default function PlanCard({ plan }: { plan: Row<'WorkoutPlan'> }) {
    return (
        <Card>
            <Stack direction="row" sx={{ alignItems: 'center', p: 2 }}>
                <Typography>{plan.name}</Typography>
            </Stack>
        </Card>
    );
}
