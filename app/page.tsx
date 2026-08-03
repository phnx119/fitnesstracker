'use client';

import GlobalLoading from '@/app/loading';
import { dbInstance } from '@/database/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function Home() {
    const router = useRouter();
    const hasRedirected = useRef(false);

    useEffect(() => {
        router.prefetch('/training');
    }, [router]);

    const settings = useLiveQuery(() => dbInstance.Settings.get(1), []);

    useEffect(() => {
        if (settings !== undefined && !hasRedirected.current) {
            hasRedirected.current = true;
            const destination = settings?.landingPage || '/training';
            router.replace(destination);
        }
    }, [settings, router]);

    return <GlobalLoading />;
}
