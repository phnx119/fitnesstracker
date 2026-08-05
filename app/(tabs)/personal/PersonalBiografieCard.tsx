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
                {/* alternativ könntest du auch das label neben dem input anzeigen bspw links label rechts input, dann werden die karten allgemein auch kleiner und sind nicht so leer */}
            </CardContent>
        </Card>
    );
}
