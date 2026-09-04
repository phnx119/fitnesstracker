'use client';

import { BlobImage } from '@/components/BlobImage';
import { Row } from '@/database/db';
import { CheckBox } from '@mui/icons-material';
import {
    ImageList,
    ImageListItem,
    ImageListItemBar,
    Stack,
} from '@mui/material';
import { useMemo } from 'react';

export default function MachineList({
    machines,
    onClick,
    selectedIds = [],
}: {
    machines: Row<'Machine'>[];
    onClick(machine: Row<'Machine'>): void;
    selectedIds?: number[];
}) {
    const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds]);

    return (
        <ImageList cols={2} gap={8} sx={{ overflow: 'auto' }}>
            {machines.map((item) => (
                <ImageListItem
                    key={item.id}
                    onClick={() => onClick(item)}
                    sx={{
                        contentVisibility: 'auto',
                        containIntrinsicSize: '0 180px',
                    }}
                >
                    <BlobImage blob={item.imageBlob} />

                    {selectedSet.has(item.id) && (
                        <Stack
                            sx={{
                                position: 'absolute',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '100%',
                                width: '100%',
                                bgcolor: '#000000A0',
                            }}
                        >
                            <CheckBox sx={{ fontSize: 40 }} />
                        </Stack>
                    )}

                    <ImageListItemBar title={item.name} />
                </ImageListItem>
            ))}
        </ImageList>
    );
}
