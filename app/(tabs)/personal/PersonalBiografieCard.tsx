import {
    Button,
    Card,
    CardActions,
    CardContent,
    TextField,
    Typography,
} from '@mui/material';
import { useState } from 'react';

export default function PersonalBiografieCard(bioValue: number, lable: string) {
    const [value, setValue] = useState('');
    return (
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h6">{lable}</Typography>
                <TextField value={bioValue} />
            </CardContent>
            <CardActions>
                <Button size="small">Edit</Button>
            </CardActions>
        </Card>
    );
}
