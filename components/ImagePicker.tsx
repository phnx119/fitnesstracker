'use client';

import { SchemaTables, dbInstance } from '@/database/db';
import {
    AddPhotoAlternate,
    Close,
    ImageNotSupported,
} from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import type { Table } from 'dexie';
import { useLiveQuery } from 'dexie-react-hooks';
import { useEffect, useMemo, useState, type ChangeEvent } from 'react';

type TablesWithImage = {
    [K in keyof SchemaTables]: 'imageBlob' extends keyof SchemaTables[K]
        ? K
        : never;
}[keyof SchemaTables];

export default function ImagePicker({
    tableName,
    dbRowId,
}: {
    tableName: TablesWithImage;
    dbRowId: number;
}) {
    const [showDialog, setShowDialog] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isSaving, setIsSaving] = useState<boolean>(false);

    const table = dbInstance[tableName] as unknown as Table<
        { imageBlob?: Blob },
        number
    >;

    const row = useLiveQuery(() => table.get(dbRowId), [dbRowId, table]);
    const storedBlob = row?.imageBlob;

    const activeBlob = selectedFile ?? storedBlob;

    const previewUri = useMemo(() => {
        if (!activeBlob) {
            return null;
        }
        return URL.createObjectURL(activeBlob);
    }, [activeBlob]);

    useEffect(() => {
        return () => {
            if (previewUri) {
                URL.revokeObjectURL(previewUri);
            }
        };
    }, [previewUri]);

    return (
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
                <DialogContent>
                    <Stack sx={{ gap: 1 }}>
                        {previewUri ? (
                            <Box
                                component="img"
                                src={previewUri}
                                sx={{
                                    width: '100%',
                                    aspectRatio: '1 / 1',
                                    objectFit: 'fill',
                                    borderRadius: 1,
                                    boxShadow: 3,
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

                        <Stack
                            direction="row"
                            sx={{ gap: 1, justifyContent: 'center' }}
                        >
                            <Button component="label" disabled={isSaving}>
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
                                disabled={!selectedFile || isSaving}
                            >
                                <SaveIcon />
                            </Button>

                            {(storedBlob !== undefined ||
                                selectedFile !== null) && (
                                <Button
                                    color="error"
                                    onClick={handleDeleteClick}
                                    disabled={isSaving}
                                >
                                    <DeleteIcon />
                                </Button>
                            )}
                        </Stack>
                    </Stack>
                </DialogContent>
            </Dialog>
        </>
    );

    function closeDialog() {
        setShowDialog(false);
    }

    function handleFileChange(event: ChangeEvent<HTMLInputElement>): void {
        const file = event.target.files?.[0];
        if (!file) {
            return;
        }

        setSelectedFile(file);

        event.target.value = '';
    }

    async function handleSaveClick(): Promise<void> {
        if (!selectedFile) {
            return;
        }

        try {
            setIsSaving(true);
            await table.update(dbRowId, { imageBlob: selectedFile });
            setSelectedFile(null);
        } catch (error) {
            console.error('Failed to save image:', error);
        } finally {
            setIsSaving(false);
        }
    }

    async function handleDeleteClick(): Promise<void> {
        try {
            setIsSaving(true);
            setSelectedFile(null);
            await table.update(dbRowId, { imageBlob: undefined });
        } catch (error) {
            console.error('Failed to remove image:', error);
        } finally {
            setIsSaving(false);
        }
    }
}
