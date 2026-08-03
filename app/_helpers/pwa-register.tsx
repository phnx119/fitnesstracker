'use client';

import { useEffect } from 'react';

export default function PwaRegister() {
    useEffect(() => {
        if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
            return;
        }

        const registerSW = async () => {
            try {
                await navigator.serviceWorker.register('/sw.js', {
                    scope: '/',
                });
            } catch (error) {
                console.error('Service worker registration failed', error);
            }
        };

        if ('requestIdleCallback' in window) {
            window.requestIdleCallback(() => void registerSW());
        } else {
            setTimeout(() => void registerSW(), 1000);
        }
    }, []);

    return null;
}
