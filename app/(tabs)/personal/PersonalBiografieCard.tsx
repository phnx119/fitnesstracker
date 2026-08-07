import NumberField from '@/components/NumberField';
import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
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
                <Stack sx={{ gap: 1 }} direction={'row'}>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" sx={{}}>
                            {label}
                        </Typography>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <NumberField value={bioValue ?? 0}></NumberField>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
}
