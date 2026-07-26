import { dbInstance } from '@/database/db';
import { redirect } from 'next/navigation';

export default function Home() {
    ensureSettings();
    redirect('/training');

    async function ensureSettings() {
        const settings = await dbInstance.Settings.get(1);

        if (!settings) {
            await dbInstance.Settings.put({
                id: 1,
                showDbViewer: true,
            });
        }
    }
}
