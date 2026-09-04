'use client';

import { SchemaTables, dbInstance } from '@/database/db';
import {
    AddPhotoAlternate,
    Close,
    ImageNotSupported,
} from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import {
    Card,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
} from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import type { Table } from 'dexie';
import { useEffect, useState, type ChangeEvent } from 'react';

type TablesWithImage = {
    [K in keyof SchemaTables]: 'imageBlob' extends keyof SchemaTables[K]
        ? K
        : never;
}[keyof SchemaTables];

export default function ImagePicker({
    tableName,
    dbRowId,
    dialog = false,
}: {
    tableName: TablesWithImage;
    dbRowId: number;
    dialog?: boolean;
}) {
    const [showDialog, setShowDialog] = useState(false);
    const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const table = dbInstance[tableName] as unknown as Table<
        { imageBlob?: Blob },
        number
    >;

    useEffect(() => {
        loadImage();
        return () => {
            if (imageUrl) URL.revokeObjectURL(imageUrl);
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, []);

    const activeUrl = previewUrl || imageUrl;

    const imagePickerContent = (
        <Stack sx={{ gap: 1, p: 1 }}>
            {activeUrl ? (
                <Box
                    component="img"
                    src={activeUrl}
                    sx={{
                        width: '100%',
                        aspectRatio: '1 / 1',
                        objectFit: 'cover',
                        borderRadius: 1,
                        boxShadow: 3,
                        contain: 'paint layout',
                    }}
                />
            ) : (
                <Stack
                    sx={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        aspectRatio: '1 / 1',
                        flex: 1,
                    }}
                >
                    <ImageNotSupported fontSize="large" />
                </Stack>
            )}

            <Stack direction="row" sx={{ gap: 1, justifyContent: 'center' }}>
                <Button component="label">
                    <AddPhotoAlternate />
                    <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleFileChange}
                    />
                </Button>

                <Button
                    color="success"
                    onClick={handleSaveClick}
                    disabled={!compressedBlob}
                >
                    <SaveIcon />
                </Button>

                <Button
                    color="error"
                    onClick={handleDeleteClick}
                    disabled={!imageUrl}
                >
                    <DeleteIcon />
                </Button>
            </Stack>
        </Stack>
    );

    return dialog ? (
        <>
            <Button
                startIcon={<AddPhotoAlternate />}
                onClick={() => setShowDialog(true)}
            >
                Select Image
            </Button>
            <Dialog open={showDialog} onClose={closeDialog}>
                <DialogTitle>
                    <Stack direction="row">
                        Select an image
                        <Box sx={{ flex: 1 }} />
                        <IconButton onClick={closeDialog}>
                            <Close />
                        </IconButton>
                    </Stack>
                </DialogTitle>
                <DialogContent>{imagePickerContent}</DialogContent>
            </Dialog>
        </>
    ) : (
        <Stack>
            <Card
                sx={{ maxWidth: 800, bgcolor: '#00000000' }}
                variant="outlined"
            >
                {imagePickerContent}
            </Card>
        </Stack>
    );

    async function loadImage() {
        const row = await table.get(dbRowId);
        setImageUrl((prev) => {
            if (prev) URL.revokeObjectURL(prev);
            return row?.imageBlob && row.imageBlob instanceof Blob
                ? URL.createObjectURL(row.imageBlob)
                : null;
        });
    }

    function closeDialog() {
        setShowDialog(false);
    }

    async function handleFileChange(
        event: ChangeEvent<HTMLInputElement>,
    ): Promise<void> {
        const file = event.target.files?.[0];
        if (!file) {
            return;
        }

        const resized = await resizeImage(file, 600);
        setCompressedBlob(resized);

        setPreviewUrl((prev) => {
            if (prev) URL.revokeObjectURL(prev);
            return URL.createObjectURL(resized);
        });
    }

    async function handleSaveClick(): Promise<void> {
        if (!compressedBlob) {
            return;
        }

        await table.update(dbRowId, { imageBlob: compressedBlob });
        setCompressedBlob(null);
        setPreviewUrl((prev) => {
            if (prev) URL.revokeObjectURL(prev);
            return null;
        });
        loadImage();
    }

    async function handleDeleteClick(): Promise<void> {
        setCompressedBlob(null);
        setPreviewUrl((prev) => {
            if (prev) URL.revokeObjectURL(prev);
            return null;
        });
        await table.update(dbRowId, { imageBlob: undefined });
        loadImage();
    }
}

async function resizeImage(file: File, maxSize = 600): Promise<Blob> {
    try {
        const bitmap = await createImageBitmap(file);
        const canvas = document.createElement('canvas');
        let { width, height } = bitmap;

        if (width > height) {
            if (width > maxSize) {
                height = Math.round((height * maxSize) / width);
                width = maxSize;
            }
        } else {
            if (height > maxSize) {
                width = Math.round((width * maxSize) / height);
                height = maxSize;
            }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(bitmap, 0, 0, width, height);

        return new Promise((resolve) => {
            canvas.toBlob(
                (blob) => {
                    resolve(blob || file);
                },
                'image/webp',
                0.85,
            );
        });
    } catch {
        return file;
    }
}
