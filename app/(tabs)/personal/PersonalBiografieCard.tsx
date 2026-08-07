import NumberField from '@/components/NumberField';
import { dbInstance } from '@/database/db';
import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
import { JSX } from 'react';

type Props = {
    label: string;
    attName: string;
    bioValue?: number;
};

export default function PersonalBiografieCard({
    label,
    attName,
    bioValue,
}: Props): JSX.Element {
    return (
        <Card variant="outlined">
            <CardContent>
                <Stack sx={{ gap: 1 }} direction={'row'}>
                    <Box sx={{ flex: 1, alignSelf: 'center' }}>
                        <Typography variant="h6" sx={{}}>
                            {label}
                        </Typography>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <NumberField
                            onValueChange={(newValue) => {
                                dbInstance.PersonalData.update(1, {
                                    [attName]: newValue,
                                });
                            }}
                            value={bioValue ?? 0}
                        ></NumberField>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
}
