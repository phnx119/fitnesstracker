'use client';

import { SchemaTables, dbInstance } from '@/database/db';
import { AddPhotoAlternate } from '@mui/icons-material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
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
        <Stack sx={{ maxWidth: 800 }}>
            <Card>
                <Stack sx={{ p: 1, gap: 1 }}>
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
                            <AddPhotoAlternate fontSize="large" />
                        </Stack>
                    )}

                    <Stack
                        direction="row"
                        sx={{ gap: 1, justifyContent: 'center' }}
                    >
                        <Button
                            component="label"
                            variant="contained"
                            disabled={isSaving}
                        >
                            <CloudUploadIcon />
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handleFileChange}
                            />
                        </Button>

                        <Button
                            variant="outlined"
                            color="success"
                            onClick={handleSaveClick}
                            disabled={!selectedFile || isSaving}
                        >
                            <SaveIcon />
                        </Button>

                        {(storedBlob !== undefined ||
                            selectedFile !== null) && (
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={handleDeleteClick}
                                disabled={isSaving}
                            >
                                <DeleteIcon />
                            </Button>
                        )}
                    </Stack>
                </Stack>
            </Card>
        </Stack>
    );

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
