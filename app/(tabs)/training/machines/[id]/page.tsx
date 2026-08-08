'use client';

import MachineChart from '@/app/(tabs)/training/machines/[id]/MachineChart';
import { dbInstance, Row } from '@/database/db';
import { AddBox, Settings } from '@mui/icons-material';
import { Button, IconButton, Stack } from '@mui/material';
import { useLiveQuery } from 'dexie-react-hooks';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { useCallback, useState } from 'react';
import TrainingContainer from '../../TrainingContainer';
import SetInput from '../SetInput';

export default function MachinePage() {
    const pathName = usePathname();

    const settings = useLiveQuery(() => dbInstance.Settings.get(1));

    const { id: idString } = useParams<{ id: string }>();
    const machineId = Number(idString);
    const machine = useLiveQuery(() => dbInstance.Machine.get(machineId));

    const getMachineData = useCallback(async () => {
        if (!machineId) return [];

        const sessionMap = new Map<
            number,
            Row<'MachineSession'> & { setRecords: Row<'SetRecord'>[] }
        >();
        const sessionIds: number[] = [];

        await dbInstance.MachineSession.where('machineId')
            .equals(machineId)
            .each((session) => {
                sessionIds.push(session.id);
                sessionMap.set(session.id, { ...session, setRecords: [] });
            });

        if (sessionIds.length === 0) return [];

        let cachedId: number | null = null;
        let cachedSession:
            | (Row<'MachineSession'> & { setRecords: Row<'SetRecord'>[] })
            | undefined;

        await dbInstance.SetRecord.where('sessionId')
            .anyOf(sessionIds)
            .each((record) => {
                if (record.sessionId !== cachedId) {
                    cachedId = record.sessionId;
                    cachedSession = sessionMap.get(record.sessionId);
                }
                if (cachedSession) {
                    cachedSession.setRecords.push(record);
                }
            });

        const result = Array.from(sessionMap.values());
        for (let i = 0; i < result.length; i++) {
            result[i].setRecords.sort((a, b) => a.setNumber - b.setNumber);
        }

        return result;
    }, [machineId]);

    const machineData = useLiveQuery(getMachineData, [getMachineData]) ?? [];

    const [activeSessionId, setActiveSessionId] = useState<number | null>(null);

    const session = machineData.find((item) => item.id === activeSessionId);

    return machine ? (
        <TrainingContainer
            title={machine.name}
            headerButtons={
                <Link href={`${pathName}/settings`}>
                    <IconButton>
                        <Settings />
                    </IconButton>
                </Link>
            }
        >
            <Stack
                sx={{
                    gap: 1,
                    pt: 1,
                    mt: -1,
                    overflow: 'auto',
                    flex: settings?.bigScreenMode ? 1 : 3,
                }}
            >
                {machineData
                    .find((item) => item.id === activeSessionId)
                    ?.setRecords.map((item) => (
                        <SetInput key={item.id} setId={item.id} />
                    ))}
            </Stack>

            <Stack
                direction="row"
                // HEIGHT HAS TO BE HARDCODED. ICONBUTTON MESSES UP THE CHART OTHERWISE
                sx={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 40,
                }}
            >
                {/* <IconButton onClick={removeSession}>
                    <CancelPresentation />
                </IconButton>

                <IconButton onClick={removeSet}>
                    <AddBox />
                </IconButton>

                <IconButton onClick={addSession}>
                    <AddBox />
                </IconButton>

                <IconButton onClick={addSet}>
                    <AddBox />
                </IconButton> */}
                <Button startIcon={<AddBox />}>tttt</Button>
                <IconButton>
                    <AddBox />
                </IconButton>
                <Button>tttt</Button>
                <Button>tttt</Button>
                <Button>tttt</Button>
            </Stack>

            <Stack
                sx={{ flex: settings?.bigScreenMode ? 2 : 5, overflow: 'auto' }}
            >
                <MachineChart
                    data={machineData}
                    setActiveSessionId={setActiveSessionId}
                />
            </Stack>
        </TrainingContainer>
    ) : null;

    function addSession() {
        if (!machine?.id) {
            return;
        }

        dbInstance.MachineSession.add({
            machineId: machine?.id,
            date: Date.now(),
        }).then((id) => setActiveSessionId(id));
    }

    function removeSession() {
        if (!machine?.id || !activeSessionId) {
            return;
        }

        dbInstance.MachineSession.delete(activeSessionId).then(() =>
            setActiveSessionId(null),
        );
    }

    function addSet() {
        if (!machine?.id || !activeSessionId || !session) {
            return;
        }

        dbInstance.SetRecord.add({
            machineId: machine.id,
            sessionId: activeSessionId,
            reps: 12,
            setNumber: session.setRecords.length,
            weight: 50,
        });
    }

    function removeSet() {
        if (!machine?.id || !activeSessionId || !session) {
            return;
        }

        const targetId = session.setRecords[session.setRecords.length - 1].id;

        dbInstance.SetRecord.delete(targetId);
    }
}
