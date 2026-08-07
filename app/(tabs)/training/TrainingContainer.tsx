'use client';

import Header from '@/components/Header';
import TabContentStack from '@/components/TabContentStack';
import { Stack } from '@mui/material';
import { PropsWithChildren, ReactNode } from 'react';

export default function TrainingContainer({
    title,
    headerButtons = null,
    showClose = true,
    children,
}: PropsWithChildren<{
    title: string;
    headerButtons?: ReactNode;
    showClose?: boolean;
}>) {
    return (
        <Stack sx={{ flex: 1, overflow: 'auto' }}>
            <Header title={title} showClose={showClose}>
                {headerButtons}
            </Header>

            <TabContentStack>{children}</TabContentStack>
        </Stack>
    );
}
