import {
    Button,
    Card,
    CardActions,
    CardContent,
    TextField,
    Typography,
} from '@mui/material';

export default function PersonalBiografieCard() {
    return (
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h6">Some Header</Typography>
                <TextField />
            </CardContent>
            <CardActions>
                <Button size="small">Edit</Button>
            </CardActions>
        </Card>
    );
}
