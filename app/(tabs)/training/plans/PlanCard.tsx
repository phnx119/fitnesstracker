'use client';

import { BlobImage } from '@/components/BlobImage';
import { Row } from '@/database/db';
import { Box, Card, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const PlanCard = React.memo(function PlanCard({
    plan,
}: {
    plan: Row<'WorkoutPlan'>;
}) {
    const pathName = usePathname();
    return (
        <Link href={`${pathName}/${plan.id}`}>
            <Card>
                <Stack
                    direction="row"
                    sx={{
                        alignItems: 'center',
                        p: 1,
                        gap: 2,
                        flex: 1,
                    }}
                >
                    <Stack sx={{ aspectRatio: 1, height: 80, minWidth: 80 }}>
                        <BlobImage
                            blob={plan.imageBlob}
                            cacheKey={`plan-${plan.id}`}
                        />
                    </Stack>
                    <Typography sx={{ fontWeight: 500 }}>
                        {plan.name}
                    </Typography>

                    <Box sx={{ flex: 1 }} />

                    {plan.lastUsed ? (
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
                    ) : null}
                </Stack>
            </Card>
        </Link>
    );
});

export default PlanCard;
