/// <reference lib="webworker" />

import { defaultCache } from '@serwist/next/worker';
import type { PrecacheEntry } from 'serwist';
import { Serwist } from 'serwist';

declare const self: ServiceWorkerGlobalScope & {
    __SW_MANIFEST: (string | PrecacheEntry)[];
};

const serwist = new Serwist({
    precacheEntries: self.__SW_MANIFEST,
    skipWaiting: true,
    clientsClaim: true,
    navigationPreload: true,
    runtimeCaching: defaultCache,
    // Fallback für App Router Document-Requests:
    fallbacks: {
        entries: [
            {
                url: '/', // Nutzt den Root-Einstiegspunkt als Offline-Fallback Shell
                matcher({ request }) {
                    return request.destination === 'document';
                },
            },
        ],
    },
});

serwist.addEventListeners();
