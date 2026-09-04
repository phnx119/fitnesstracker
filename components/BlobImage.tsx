'use client';

import { HideImage } from '@mui/icons-material';
import { Skeleton } from '@mui/material';
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
        if (!blob || !(blob instanceof Blob)) {
            return;
        }

        const objectUrl = URL.createObjectURL(blob);
        // Synchronize browser resource URL with state
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setPreviewUri(objectUrl);

        return () => {
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
                <HideImage />
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
                objectFit: 'cover',
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
