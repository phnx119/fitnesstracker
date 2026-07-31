import {
    Button,
    Card,
    CardActions,
    CardContent,
    TextField,
    Typography,
} from '@mui/material';
import { JSX } from 'react';

type Props = {
    label: string;
    bioValue?: number;
};

export default function PersonalBiografieCard({
    label,
    bioValue,
}: Props): JSX.Element {
    return (
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h6">{label}</Typography>
                <TextField type="number">{bioValue}</TextField>
            </CardContent>
            <CardActions>
                <Button size="small">Edit</Button>
            </CardActions>
        </Card>
    );
}
