import { dbInstance } from '@/database/db';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    TextField,
    Typography,
} from '@mui/material';
import { useLiveQuery } from 'dexie-react-hooks';
import { useState } from 'react';

export default function PersonalBiografieCard() {
    const personalData = useLiveQuery(() => dbInstance.PersonalData.get(1));
    const [value, setValue] = useState('');
    return (
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h6">Body Height</Typography>
                <TextField value={personalData?.bodyHeight} />
            </CardContent>
            <CardActions>
                <Button size="small">Edit</Button>
            </CardActions>
        </Card>
    );
}
