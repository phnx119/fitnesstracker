import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SaveIcon from '@mui/icons-material/Save';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';

export default function ImagePicker({
    onSave,
    pickButtonLabel = 'Choose Image',
    saveButtonLabel = 'Save to Database',
}: {
    onSave(file: File): Promise<void>;
    pickButtonLabel?: string;
    saveButtonLabel?: string;
}) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUri, setPreviewUri] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState<boolean>(false);

    useEffect(() => {
        return () => {
            if (previewUri) {
                URL.revokeObjectURL(previewUri);
            }
        };
    }, [previewUri]);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                width: '100%',
            }}
        >
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
                    No image selected
                </Typography>
            )}

            <Button
                variant="outlined"
                color="success"
                startIcon={<SaveIcon />}
                onClick={handleSaveClick}
                disabled={!selectedFile || isSaving}
            >
                {isSaving ? 'Saving...' : saveButtonLabel}
            </Button>
        </Box>
    );

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (!file) return;

        setSelectedFile(file);

        if (previewUri) {
            URL.revokeObjectURL(previewUri);
        }

        setPreviewUri(URL.createObjectURL(file));
    }

    async function handleSaveClick() {
        if (!selectedFile) return;

        try {
            setIsSaving(true);
            await onSave(selectedFile);
            setSelectedFile(null);
            setPreviewUri(null);
        } catch (error) {
            console.error('Failed to save image:', error);
        } finally {
            setIsSaving(false);
        }
    }
}
