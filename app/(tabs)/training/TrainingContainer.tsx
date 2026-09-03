'use client';

import Header from '@/components/Header';
import TabContentStack from '@/components/TabContentStack';
import { Stack } from '@mui/material';
import { PropsWithChildren, ReactNode } from 'react';

export default function TrainingContainer({
    title,
    headerButtons = null,
    showHome = false,
    children,
}: PropsWithChildren<{
    title: string;
    headerButtons?: ReactNode;
    showHome?: boolean;
}>) {
    return (
        <Stack sx={{ flex: 1, overflow: 'auto' }}>
            <Header title={title} showHome={showHome}>
                {headerButtons}
            </Header>

            <TabContentStack>{children}</TabContentStack>
        </Stack>
    );
}
