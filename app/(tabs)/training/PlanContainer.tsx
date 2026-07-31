'use client';

import Header from '@/components/Header';
import TabContentStack from '@/components/TabContentStack';
import { Close } from '@mui/icons-material';
import { IconButton, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';
import { PropsWithChildren, ReactNode } from 'react';

export default function PlanContainer({
    title,
    headerButtons,
    children,
}: PropsWithChildren<{
    title: string;
    headerButtons: ReactNode;
}>) {
    const router = useRouter();

    return (
        <Stack sx={{ flex: 1 }}>
            <Header title={title}>
                {headerButtons}
                <IconButton onClick={() => router.back()}>
                    <Close />
                </IconButton>
            </Header>

            <TabContentStack>{children}</TabContentStack>
        </Stack>
    );
}
