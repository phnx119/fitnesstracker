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
import { useEffect, useMemo, useState, type ChangeEvent } from 'react';

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
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imageBlob, setImageBlob] = useState<Blob | null>(null);

    const table = dbInstance[tableName] as unknown as Table<
        { imageBlob?: Blob },
        number
    >;

    useEffect(() => {
        loadImage();
    }, []);

    const activeBlob = selectedFile ?? imageBlob;

    const previewUri = useObjectUrl(activeBlob);

    const imagePickerContent = (
        <Stack sx={{ gap: 1, p: 1 }}>
            {previewUri ? (
                <Box
                    component="img"
                    key={previewUri}
                    src={previewUri}
                    sx={{
                        width: '100%',
                        maxHeight: 300,
                        aspectRatio: '1 / 1',
                        objectFit: 'fill',
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
                        maxHeight: 300,
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
                    disabled={!selectedFile}
                >
                    <SaveIcon />
                </Button>

                <Button
                    color="error"
                    onClick={handleDeleteClick}
                    disabled={imageBlob === undefined}
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
        await table.get(dbRowId).then((row) => {
            if (row?.imageBlob) {
                setImageBlob(row.imageBlob);
            } else {
                setImageBlob(null);
            }
        });
    }

    function closeDialog() {
        setShowDialog(false);
    }

    function handleFileChange(event: ChangeEvent<HTMLInputElement>): void {
        const file = event.target.files?.[0];
        if (!file) {
            return;
        }

        setSelectedFile(file);
    }

    async function handleSaveClick(): Promise<void> {
        if (!selectedFile) {
            return;
        }

        await table.update(dbRowId, { imageBlob: selectedFile });
        setSelectedFile(null);
        loadImage();
    }

    async function handleDeleteClick(): Promise<void> {
        setSelectedFile(null);
        await table.update(dbRowId, { imageBlob: undefined });
        loadImage();
    }
}

function useObjectUrl(blob: Blob | File | null | undefined): string | null {
    const blobKey = blob
        ? `${blob.size}-${blob.type}-${(blob as File).lastModified ?? 0}`
        : null;

    const url = useMemo(() => {
        if (!blob) return null;
        return URL.createObjectURL(blob);
    }, [blobKey]);

    useEffect(() => {
        if (!url) return;

        return () => {
            URL.revokeObjectURL(url);
        };
    }, [url]);

    return url;
}
