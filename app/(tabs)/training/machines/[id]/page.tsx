'use client';

import { dbInstance, Row } from '@/database/db';
import { Settings } from '@mui/icons-material';
import { Button, Dialog, IconButton } from '@mui/material';
import { useLiveQuery } from 'dexie-react-hooks';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import TrainingContainer from '../../TrainingContainer';
import EditMachineDialog from '../EditMachineDialog';

export default function MachinePage() {
    const { id: idString } = useParams<{ id: string }>();
    const machineId = Number(idString);
    const machine = useLiveQuery(() => dbInstance.Machine.get(machineId));

    const [showEditDialog, setShowEditDialog] = useState(false);

    const machineData = useLiveQuery(getMachineData) ?? [];

    const [activeSessionId, setActiveSessionId] = useState<number | null>(null);

    return machine ? (
        <TrainingContainer
            title={machine.name}
            headerButtons={
                <IconButton onClick={() => setShowEditDialog(true)}>
                    <Settings />
                </IconButton>
            }
        >
            <Button onClick={addSession}>Add session</Button>
            <Button onClick={addSet}>Add set</Button>

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

    function addSet() {
        if (!machine?.id || !activeSessionId) {
            return;
        }

        dbInstance.SetRecord.add({
            machineId: machine.id,
            sessionId: activeSessionId,
            reps: 12,
            setNumber: 1,
            weight: 50,
        });
    }

    function closeEditDialog() {
        setShowEditDialog(false);
    }

    async function getMachineData() {
        if (!machineId) return [];

        // 1. Fetch sessions for the specified machine
        const sessions = await dbInstance.MachineSession.where('machineId')
            .equals(machineId)
            .toArray();

        if (sessions.length === 0) return [];

        // 2. Pre-allocate Map and Session IDs
        const sessionMap = new Map<
            number,
            Row<'MachineSession'> & {
                setRecords: Row<'SetRecord'>[];
            }
        >();
        const sessionIds: number[] = new Array(sessions.length);

        for (let i = 0; i < sessions.length; i++) {
            const s = sessions[i];
            sessionIds[i] = s.id;
            sessionMap.set(s.id, { ...s, setRecords: [] });
        }

        // 3. Single-pass cursor stream over indexed SetRecords using 'anyOf'
        await dbInstance.SetRecord.where('sessionId')
            .anyOf(sessionIds)
            .each((record) => {
                const session = sessionMap.get(record.sessionId);
                if (session) {
                    session.setRecords.push(record);
                }
            });

        // 4. In-place sort of the small set arrays (~3 items each)
        const result = Array.from(sessionMap.values());
        for (let i = 0; i < result.length; i++) {
            result[i].setRecords.sort((a, b) => a.setNumber - b.setNumber);
        }

        return result;
    }
}
