import { dbInstance } from '@/database/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { redirect } from 'next/navigation';

export default function Home() {
    const landingPage =
        useLiveQuery(() => dbInstance.Settings.get(1))?.landingPage ??
        '/training';

    redirect(landingPage);
}
