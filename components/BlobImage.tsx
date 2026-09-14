'use client';

import { HideImage } from '@mui/icons-material';
import { Skeleton } from '@mui/material';
import Box, { type BoxProps } from '@mui/material/Box';
import React, { useEffect, useState } from 'react';

// In-memory cache for Object URLs to prevent repeated revoke/re-create cycles,
// decode thrashing, and skeleton flashes across tab switches and list re-renders.
const weakBlobMap = new WeakMap<Blob, string>();
const keyBlobMap = new Map<string, { url: string; size: number; lastAccessed: number }>();
const MAX_CACHE_ENTRIES = 200;

function cleanupCacheIfFull() {
    if (keyBlobMap.size <= MAX_CACHE_ENTRIES) return;
    // Evict oldest 20%
    const entries = Array.from(keyBlobMap.entries()).sort(
        (a, b) => a[1].lastAccessed - b[1].lastAccessed,
    );
    const evictCount = Math.ceil(MAX_CACHE_ENTRIES * 0.2);
    for (let i = 0; i < evictCount && i < entries.length; i++) {
        const [key, val] = entries[i];
        URL.revokeObjectURL(val.url);
        keyBlobMap.delete(key);
    }
}

export function getBlobUrl(
    blob: Blob | undefined | null,
    cacheKey?: string | number,
): string | null {
    if (!blob || !(blob instanceof Blob)) return null;
    if (typeof window === 'undefined') return null;

    // Check WeakMap first for exact instance match
    const fromWeak = weakBlobMap.get(blob);
    if (fromWeak) return fromWeak;

    // Check key cache if cacheKey provided
    const stringKey = cacheKey !== undefined ? String(cacheKey) : null;
    if (stringKey) {
        const cached = keyBlobMap.get(stringKey);
        if (cached && cached.size === blob.size) {
            cached.lastAccessed = Date.now();
            weakBlobMap.set(blob, cached.url);
            return cached.url;
        }
        if (cached) {
            URL.revokeObjectURL(cached.url);
            keyBlobMap.delete(stringKey);
        }
    }

    // Create new object URL
    try {
        const newUrl = URL.createObjectURL(blob);
        weakBlobMap.set(blob, newUrl);
        if (stringKey) {
            cleanupCacheIfFull();
            keyBlobMap.set(stringKey, {
                url: newUrl,
                size: blob.size,
                lastAccessed: Date.now(),
            });
        }
        return newUrl;
    } catch {
        return null;
    }
}

export function invalidateBlobUrl(cacheKey: string | number) {
    const stringKey = String(cacheKey);
    const cached = keyBlobMap.get(stringKey);
    if (cached) {
        URL.revokeObjectURL(cached.url);
        keyBlobMap.delete(stringKey);
    }
}

export interface BlobImageProps extends Omit<BoxProps<'img'>, 'src'> {
    blob: Blob | undefined | null;
    cacheKey?: string | number;
    aspectRatio?: string | number;
}

export const BlobImage = React.memo(function BlobImage({
    blob,
    cacheKey,
    aspectRatio = 1,
    sx,
    ...props
}: BlobImageProps) {
    const [previewUri, setPreviewUri] = useState<string | null>(() =>
        getBlobUrl(blob, cacheKey),
    );

    useEffect(() => {
        const url = getBlobUrl(blob, cacheKey);
        setPreviewUri(url);
    }, [blob, cacheKey]);

    if (!blob) {
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

    if (!previewUri) {
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
                contain: 'paint layout',
                ...sx,
            }}
            {...props}
        />
    );
});
