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
                    return;
                }

                await navigator.serviceWorker.register('/sw.js', {
                    scope: '/',
                });
            } catch (error) {
                console.error('Service worker registration failed', error);
            }
        };

        const markAppReady = () => {
            try {
                sessionStorage.setItem('pwa-ready', 'true');
            } catch {
                // Ignore storage failures.
            }
        };

        const scheduleRegistration = () => {
            if ('requestIdleCallback' in window) {
                const handle = window.requestIdleCallback(() => {
                    void register().then(markAppReady);
                });

                return () => window.cancelIdleCallback(handle);
            }

            const timeoutId = globalThis.setTimeout(() => {
                void register().then(markAppReady);
            }, 2000);

            return () => globalThis.clearTimeout(timeoutId);
        };

        return scheduleRegistration();
    }, []);

    return null;
}
