'use client';

import Header from '@/components/Header';
import TabContentStack from '@/components/TabContentStack';
import { dbInstance } from '@/database/db';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Collapse, IconButton, Stack, Typography } from '@mui/material';
import { useLiveQuery } from 'dexie-react-hooks';
import { useEffect, useState } from 'react';
import PersonalBiografieCard from './PersonalBiografieCard';

export default function ExercisePage() {
    const [expanded, setExpanded] = useState(false);
    const personalData = useLiveQuery(() => dbInstance.PersonalData.get(1));
    //mausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmaus
    // einen useEffect dafür zu benutzen funktioniert zwar, ist aber so sehr schnell problematisch
    // ein useEffect löst IMMER nach dem rendern aus und dann nochmal wenn sie die abhängigkeit ändert.
    // bedeutet: so wird bei jedem aufruf der seite ein dbAdd ausgeführt, was nicht geht, weil ja die id schon vorhanden ist,
    //   die DB bekommt intern einen fehler und bricht die transaktion ab, deshalb passiert hier nichts
    // zusätzlich wird noch bei jeder einzelnen eingabe erstmal das data objekt geprüft und es besteht immer das risiko, dass die nochmal auslöst.
    //
    // Empfehlung:
    //   Das personalData objekt sollte im normalfall niemals gelöscht werden, außer man macht sich am dbviewer zu schaffen.
    //   Deshalb reicht es, beim ersten start der app direkt das objekt zu erzeugen. Das habe ich auch mit den settings so gemacht (siehe db zeile 93)
    //   Um sicherzugehen, dass es nicht zu einer kaputten db kommen kann, würde ich in den settings einen "revert personal" button hinzufügen,
    //     so wie es ja schon einen da gibt
    //mausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmaus
    useEffect(() => {
        if (!personalData?.id) {
            dbInstance.PersonalData.add({
                id: 1,
                bodyWeight: 0,
                bodyHeight: 0,
                bodyFat: 0,
                targetWeight: 0,
            });
        }
    }, [personalData]);

    //mausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmaus
    // Ich hab hier den Header hinzugefügt, damit man zurück in Home routen kann.
    // Home soll als Dashboard hauptsächlich ein paar Statistiken und sowas anzeigen aber auch das routing von der Navigationsleiste unten übernehmen.
    //mausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmausmaus
    return (
        <>
            <Header title="Ich war mal so frei" showHome />
            <TabContentStack sx={{ gap: 1, overflow: 'auto' }}>
                <Stack direction="row">
                    <Box sx={{ flex: 1 }} />
                    <Typography>Overview</Typography>
                    <Box sx={{ flex: 1 }} />
                </Stack>
                <Stack sx={{ overflow: 'auto', gap: 1 }}>
                    <Stack direction="row">
                        <Typography variant="h6">
                            Show Biometric Data
                        </Typography>
                        <IconButton onClick={() => setExpanded(!expanded)}>
                            <ExpandMoreIcon
                                sx={{
                                    transform: expanded
                                        ? 'rotate(180deg)'
                                        : 'rotate(0deg)',
                                    transition: '0.2s',
                                }}
                            />
                        </IconButton>
                    </Stack>
                    <Collapse in={expanded}>
                        <Stack sx={{ gap: 1 }}>
                            <PersonalBiografieCard
                                label={'Body Weight'}
                                attName="bodyWeight"
                                bioValue={personalData?.bodyWeight}
                            />
                            <PersonalBiografieCard
                                label={'Body Height'}
                                attName="bodyHeight"
                                bioValue={personalData?.bodyHeight}
                            />
                            <PersonalBiografieCard
                                label={'Body Fat'}
                                attName="bodyFat"
                                bioValue={personalData?.bodyFat}
                            />
                            <PersonalBiografieCard
                                label={'Target Weight'}
                                attName="targetWeight"
                                bioValue={personalData?.targetWeight}
                            />
                        </Stack>
                    </Collapse>
                </Stack>
                <Stack>
                    <Box>
                        <Typography>Kalorie graph Placeholder</Typography>
                    </Box>
                </Stack>
                <Stack>
                    <Box>
                        <Typography>
                            Kalorie subpage access / rerouting
                        </Typography>
                    </Box>
                </Stack>
            </TabContentStack>
        </>
    );
}
