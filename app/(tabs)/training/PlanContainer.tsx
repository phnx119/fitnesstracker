'use client';

import Header from '@/components/Header';
import TabContentStack from '@/components/TabContentStack';
import { Stack } from '@mui/material';
import { PropsWithChildren, ReactNode } from 'react';

export default function PlanContainer({
    title,
    headerButtons,
    children,
}: PropsWithChildren<{
    title: string;
    headerButtons: ReactNode;
}>) {
    return (
        <Stack sx={{ flex: 1 }}>
            <Header title={title}>{headerButtons}</Header>

            <TabContentStack>{children}</TabContentStack>
        </Stack>
    );
}
