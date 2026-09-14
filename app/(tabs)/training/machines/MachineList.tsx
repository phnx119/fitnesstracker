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
import React, { useCallback, useMemo } from 'react';

const MachineItem = React.memo(function MachineItem({
    item,
    isSelected,
    onClick,
}: {
    item: Row<'Machine'>;
    isSelected: boolean;
    onClick: (machine: Row<'Machine'>) => void;
}) {
    const handleClick = useCallback(() => {
        onClick(item);
    }, [onClick, item]);

    return (
        <ImageListItem
            onClick={handleClick}
            sx={{
                contentVisibility: 'auto',
                containIntrinsicSize: '0 180px',
                cursor: 'pointer',
                borderRadius: 1,
                overflow: 'hidden',
                position: 'relative',
            }}
        >
            <BlobImage
                blob={item.imageBlob}
                cacheKey={`machine-${item.id}`}
            />

            {isSelected && (
                <Stack
                    sx={{
                        position: 'absolute',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        width: '100%',
                        bgcolor: '#000000A0',
                        zIndex: 2,
                    }}
                >
                    <CheckBox sx={{ fontSize: 40 }} />
                </Stack>
            )}

            <ImageListItemBar title={item.name} />
        </ImageListItem>
    );
});

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
        <ImageList cols={2} gap={8} sx={{ overflow: 'auto', m: 0 }}>
            {machines.map((item) => (
                <MachineItem
                    key={item.id}
                    item={item}
                    isSelected={selectedSet.has(item.id)}
                    onClick={onClick}
                />
            ))}
        </ImageList>
    );
}
