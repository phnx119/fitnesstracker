import NumberField from '@/components/NumberField';
import { Card, CardContent, Typography } from '@mui/material';
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
                <NumberField value={bioValue ?? 0}></NumberField>
                {/* Icons / Bilder zum ausfüllen des leeren Platzes */}
            </CardContent>
        </Card>
    );
}
