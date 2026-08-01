'use client';

import { Typography } from '@mui/material';
import Box, { type BoxProps } from '@mui/material/Box';
import { useEffect, useMemo } from 'react';

export function BlobImage({
    blob,
    aspectRatio = 1,
    sx,
    ...props
}: {
    blob: Blob | undefined | null;
    aspectRatio?: string | number;
} & Omit<BoxProps<'img'>, 'src'>) {
    const previewUri = useMemo(() => {
        if (!blob) return null;
        return URL.createObjectURL(blob);
    }, [blob]);

    useEffect(() => {
        return () => {
            if (previewUri) {
                URL.revokeObjectURL(previewUri);
            }
        };
    }, [previewUri]);

    return previewUri ? (
        <Box
            component="img"
            src={previewUri}
            sx={{
                maxWidth: '100%',
                maxHeight: '100%',
                aspectRatio: aspectRatio,
                objectFit: 'fill',
                borderRadius: 1,
                ...sx,
            }}
            {...props}
        />
    ) : (
        <Box>
            <Typography>nix</Typography>
        </Box>
    );
}
