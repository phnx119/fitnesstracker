'use client';

import { Skeleton, Typography } from '@mui/material';
import Box, { type BoxProps } from '@mui/material/Box';
import { useEffect, useState } from 'react';

export function BlobImage({
    blob,
    aspectRatio = 1,
    sx,
    ...props
}: {
    blob: Blob | undefined | null;
    aspectRatio?: string | number;
} & Omit<BoxProps<'img'>, 'src'>) {
    const [previewUri, setPreviewUri] = useState<string | null>(null);

    useEffect(() => {
        if (!blob) return;

        let isMounted = true;
        const objectUrl = URL.createObjectURL(blob);

        queueMicrotask(() => {
            if (isMounted) {
                setPreviewUri(objectUrl);
            }
        });

        return () => {
            isMounted = false;
            URL.revokeObjectURL(objectUrl);
            setPreviewUri(null);
        };
    }, [blob]);

    const isLoading = Boolean(blob && !previewUri);

    if (isLoading) {
        return (
            <Skeleton
                variant="rounded"
                sx={{
                    width: '100%',
                    height: '100%',
                    aspectRatio: aspectRatio,
                    borderRadius: 1,
                    ...sx,
                }}
            />
        );
    }

    if (!previewUri) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    aspectRatio: aspectRatio,
                    bgcolor: 'action.hover',
                    borderRadius: 1,
                    ...sx,
                }}
            >
                <Typography variant="caption" color="text.secondary">
                    nix
                </Typography>
            </Box>
        );
    }

    return (
        <Box
            component="img"
            src={previewUri}
            decoding="async"
            loading="lazy"
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
    );
}

//mausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmaus
// used to display blob images
// stretches images to aspectratio 1:1 by default, can be changed with sx
// image has to be stored like this:         {imageBlob: undefined as Blob | undefined,}
//mausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmaus
