'use client';

import Chart from '@/components/Chart/Chart';
import { dbInstance, Row } from '@/database/db';
import { Settings } from '@mui/icons-material';
import { Button, Dialog, IconButton, Stack } from '@mui/material';
import { useLiveQuery } from 'dexie-react-hooks';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import TrainingContainer from '../../TrainingContainer';
import EditMachineDialog from '../EditMachineDialog';
import SetInput from '../SetInput';

export default function MachinePage() {
    const { id: idString } = useParams<{ id: string }>();
    const machineId = Number(idString);
    const machine = useLiveQuery(() => dbInstance.Machine.get(machineId));

    const [showEditDialog, setShowEditDialog] = useState(false);

    const machineData = useLiveQuery(getMachineData) ?? [];

    const [activeSessionId, setActiveSessionId] = useState<number | null>(4);

    const session = machineData.find((item) => item.id === activeSessionId);

    return machine ? (
        <TrainingContainer
            title={machine.name}
            headerButtons={
                <IconButton onClick={() => setShowEditDialog(true)}>
                    <Settings />
                </IconButton>
            }
        >
            <Stack sx={{ gap: 1, pt: 1, mt: -1, overflow: 'auto' }}>
                {machineData
                    .find((item) => item.id === activeSessionId)
                    ?.setRecords.map((item) => (
                        <SetInput key={item.id} setId={item.id} />
                    ))}
            </Stack>
            <Stack direction="row">
                <Button onClick={addSession}>+session</Button>
                <Button onClick={removeSession}>+session</Button>
                <Button onClick={addSet}>+set</Button>
                <Button onClick={removeSet}>-set</Button>
            </Stack>

            <Chart data={machineData} setActiveSessionId={setActiveSessionId} />

            <Dialog open={showEditDialog} onClose={closeEditDialog}>
                <EditMachineDialog
                    onClose={closeEditDialog}
                    machine={machine}
                />
            </Dialog>
        </TrainingContainer>
    ) : null;

    function addSession() {
        if (!machine?.id) {
            return;
        }

        dbInstance.MachineSession.add({
            machineId: machine?.id,
            date: new Date().toLocaleDateString('de-DE', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            }),
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

    function closeEditDialog() {
        setShowEditDialog(false);
    }

    async function getMachineData() {
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
    }
}
