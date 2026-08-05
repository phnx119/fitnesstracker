import NumberField from '@/components/NumberField';
import {
    Button,
    Card,
    CardActions,
    CardContent,
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
                <NumberField
                    value={bioValue ?? 0}
                    readOnly
                    disabled
                ></NumberField>
            </CardContent>
            <CardActions>
                <Button size="small">Edit</Button>
            </CardActions>
        </Card>
    );
}
