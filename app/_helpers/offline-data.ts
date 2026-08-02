'use client';

import { dbInstance } from '@/database/db';

const OFFLINE_READY_KEY = 'pwa-ready';

export type OfflineStatus = {
    ready: boolean;
    step: string;
    progress: number;
};

export async function ensureOfflineReady(
    onProgress?: (status: OfflineStatus) => void,
) {
    if (typeof window === 'undefined') {
        return false;
    }

    try {
        const wasReady = sessionStorage.getItem(OFFLINE_READY_KEY) === 'true';
        if (wasReady) {
            onProgress?.({
                ready: true,
                step: 'Ready for offline use',
                progress: 100,
            });
            return true;
        }

        onProgress?.({
            ready: false,
            step: 'Preparing local cache',
            progress: 10,
        });

        await Promise.allSettled([
            (async () => {
                onProgress?.({
                    ready: false,
                    step: 'Loading settings',
                    progress: 25,
                });
                await dbInstance.Settings.get(1);
            })(),
            (async () => {
                onProgress?.({
                    ready: false,
                    step: 'Loading plans',
                    progress: 50,
                });
                await dbInstance.WorkoutPlan.toArray();
            })(),
            (async () => {
                onProgress?.({
                    ready: false,
                    step: 'Loading personal data',
                    progress: 75,
                });
                await dbInstance.PersonalData.get(1);
            })(),
        ]);

        sessionStorage.setItem(OFFLINE_READY_KEY, 'true');
        onProgress?.({
            ready: true,
            step: 'Ready for offline use',
            progress: 100,
        });
        return true;
    } catch {
        onProgress?.({
            ready: false,
            step: 'Offline prep failed',
            progress: 0,
        });
        return false;
    }
}
