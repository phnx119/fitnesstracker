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

        const scheduleRegistration = () => {
            if ('requestIdleCallback' in window) {
                const handle = window.requestIdleCallback(() => {
                    void register();
                });

                return () => window.cancelIdleCallback(handle);
            }

            const timeoutId = globalThis.setTimeout(() => {
                void register();
            }, 2000);

            return () => globalThis.clearTimeout(timeoutId);
        };

        return scheduleRegistration();
    }, []);

    return null;
}
