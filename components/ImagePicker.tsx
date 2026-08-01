'use client';

import { SchemaTables, dbInstance } from '@/database/db';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
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
    pickButtonLabel = 'Choose Image',
    saveButtonLabel = 'Save to Database',
}: {
    tableName: TablesWithImage;
    dbRowId: number;
    pickButtonLabel?: string;
    saveButtonLabel?: string;
}) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isSaving, setIsSaving] = useState<boolean>(false);

    const table = dbInstance[tableName] as unknown as Table<
        { imageBlob?: Blob },
        number
    >;

    // 2. Fetch the row from the database
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
        <Stack>
            <Card>
                <Stack sx={{ p: 2, gap: 2 }}>
                    {previewUri ? (
                        <Box
                            component="img"
                            src={previewUri}
                            alt="Selected preview"
                            sx={{
                                width: '100%',
                                maxWidth: 250,
                                aspectRatio: '1 / 1',
                                objectFit: 'cover',
                                borderRadius: 2,
                                boxShadow: 3,
                            }}
                        />
                    ) : (
                        <Typography variant="body2" color="text.secondary">
                            {'No image selected'}
                        </Typography>
                    )}

                    <Stack direction="row" spacing={1}>
                        <Button
                            component="label"
                            variant="contained"
                            startIcon={<CloudUploadIcon />}
                            disabled={isSaving}
                        >
                            {pickButtonLabel}
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
                            startIcon={<SaveIcon />}
                            onClick={handleSaveClick}
                            disabled={!selectedFile || isSaving}
                        >
                            {isSaving ? 'Saving...' : saveButtonLabel}
                        </Button>

                        {(storedBlob !== undefined ||
                            selectedFile !== null) && (
                            <Button
                                variant="outlined"
                                color="error"
                                startIcon={<DeleteIcon />}
                                onClick={handleDeleteClick}
                                disabled={isSaving}
                            >
                                {'Delete'}
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
