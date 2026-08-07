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
    //mausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmaus
    // Hinweis zum CardContent:
    //   Dieser ist dafür gedacht, ein sinnvolles und einheitliches padding in einer card zu bekommen, wenn man noch CardHeader und CardActions benutzt.
    //   Der ist nicht dafür ausgelegt, den alleine zu benutzen
    //   Wenn du dir das padding über und unter den Numberfields anschaust, wirst du sehen, dass die nicht gleich sind...
    //   Falls du also den Inhalt deiner Cards zentriert haben möchtest, solltest du einfach einen normalen Stack nehmen mit idk padding: 2 oder sowas
    //
    //   (Warum man das padding da so eingestellt hat, verstehe ich selbst nicht... ich hasse den CardContent)
    //mausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmaus
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
