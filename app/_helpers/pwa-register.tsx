'use client';

import { useEffect } from 'react';

declare global {
    interface Window {
        workbox?: {
            register?: (options?: { scope?: string }) => Promise<void>;
        };
    }
}

export default function PwaRegister() {
    useEffect(() => {
        if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
            return;
        }

        const register = async () => {
            try {
                if (window.workbox?.register) {
                    await window.workbox.register({ scope: '/' });
                } else {
                    await navigator.serviceWorker.register('/sw.js', {
                        scope: '/',
                    });
                }

                try {
                    sessionStorage.setItem('pwa-ready', 'true');
                } catch {
                    // Ignore storage failures.
                }
            } catch (error) {
                console.error('Service worker registration failed', error);
            }
        };

        void register();

        return;
    }, []);

    return null;
}
