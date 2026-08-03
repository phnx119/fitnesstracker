'use client';

import { useEffect } from 'react';

export default function PwaRegister() {
    useEffect(() => {
        // 1. Abort if no service worker support
        if (!('serviceWorker' in navigator)) return;

        // 2. Abort if in development mode to prevent caching conflicts
        if (process.env.NODE_ENV === 'development') return;

        const registerSW = async () => {
            try {
                const reg = await navigator.serviceWorker.register('/sw.js', {
                    scope: '/',
                });

                reg.addEventListener('updatefound', () => {
                    const newWorker = reg.installing;
                    if (newWorker) {
                        newWorker.addEventListener('statechange', () => {
                            if (
                                newWorker.state === 'installed' &&
                                navigator.serviceWorker.controller
                            ) {
                                console.log(
                                    'New app version available! Reloading...',
                                );
                                window.location.reload();
                            }
                        });
                    }
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
