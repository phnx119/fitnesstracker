'use client';

import GlobalLoading from '@/app/loading';
import { dbInstance } from '@/database/db';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function Home() {
    const router = useRouter();
    const hasRedirected = useRef(false);

    useEffect(() => {
        if (hasRedirected.current) {
            return;
        }

        hasRedirected.current = true;

        const redirectToLandingPage = async () => {
            try {
                const settings = await dbInstance.Settings.get(1);
                const destination = settings?.landingPage ?? '/training';
                router.replace(destination);
            } catch {
                router.replace('/training');
            }
        };

        void redirectToLandingPage();
    }, [router]);

    return <GlobalLoading />;
}
