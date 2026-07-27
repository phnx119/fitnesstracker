import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
} from '@mui/material';

export default function AddPlanDialog({ onClose }: { onClose(): void }) {
    return (
        <>
            <DialogTitle>maus</DialogTitle>
            <DialogContent>
                <Stack sx={{ pt: 1 }}>
                    <TextField label="maus?" />
                    <TextField label="maus?" />
                    <TextField label="maus?" />
                    <TextField label="maus?" />
                    <TextField label="maus?" />
                    <TextField label="maus?" />
                    <TextField
                        label="maus?"
                        slotProps={{
                            htmlInput: {
                                autoComplete: 'off',
                            },
                        }}
                    />
                    <Button>maus</Button>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={savePlan}>Save</Button>
            </DialogActions>
        </>
    );

    function savePlan() {}
}
