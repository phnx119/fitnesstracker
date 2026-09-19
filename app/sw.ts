/// <reference lib="webworker" />

import { defaultCache } from '@serwist/next/worker';
import type { PrecacheEntry, RuntimeCaching } from 'serwist';
import {
    CacheFirst,
    ExpirationPlugin,
    NetworkFirst,
    Serwist,
} from 'serwist';

declare const self: ServiceWorkerGlobalScope & {
    __SW_MANIFEST: (string | PrecacheEntry)[];
};

const customCaching: RuntimeCaching[] = [
    // Next.js static JS & CSS bundles - immutable, cache first
    {
        matcher: ({ url }) => url.pathname.startsWith('/_next/static/'),
        handler: new CacheFirst({
            cacheName: 'next-static-assets',
            plugins: [
                new ExpirationPlugin({
                    maxEntries: 512,
                    maxAgeSeconds: 365 * 24 * 60 * 60,
                    maxAgeFrom: 'last-used',
                }),
            ],
        }),
    },
    // User images (machines, plans) from persistent CacheStorage
    {
        matcher: ({ url }) => url.pathname.startsWith('/api/user-images/'),
        handler: new CacheFirst({
            cacheName: 'user-blob-images',
            plugins: [
                new ExpirationPlugin({
                    maxEntries: 500,
                    maxAgeSeconds: 365 * 24 * 60 * 60,
                }),
            ],
        }),
    },
    // All static images, icons, and lineups
    {
        matcher: ({ url }) =>
            /\.(?:jpg|jpeg|gif|png|svg|ico|webp|avif)$/i.test(url.pathname) ||
            url.pathname.startsWith('/csLineups/') ||
            url.pathname.startsWith('/csMapIcons/') ||
            url.pathname.startsWith('/csSideIcons/') ||
            url.pathname.startsWith('/inputIcons/'),
        handler: new CacheFirst({
            cacheName: 'static-image-assets',
            plugins: [
                new ExpirationPlugin({
                    maxEntries: 512,
                    maxAgeSeconds: 365 * 24 * 60 * 60,
                    maxAgeFrom: 'last-used',
                }),
            ],
        }),
    },
    // Fonts
    {
        matcher: ({ url }) =>
            /\.(?:eot|otf|ttc|ttf|woff|woff2|font\.css)$/i.test(url.pathname),
        handler: new CacheFirst({
            cacheName: 'static-font-assets',
            plugins: [
                new ExpirationPlugin({
                    maxEntries: 64,
                    maxAgeSeconds: 365 * 24 * 60 * 60,
                    maxAgeFrom: 'last-used',
                }),
            ],
        }),
    },
    // Fast App Router RSC prefetch caching with quick network timeout
    {
        matcher: ({ request, url: { pathname }, sameOrigin }) =>
            request.headers.get('RSC') === '1' &&
            sameOrigin &&
            !pathname.startsWith('/api/'),
        handler: new NetworkFirst({
            cacheName: 'pages-rsc',
            plugins: [
                new ExpirationPlugin({
                    maxEntries: 64,
                    maxAgeSeconds: 7 * 24 * 60 * 60,
                }),
            ],
            networkTimeoutSeconds: 2,
        }),
    },
    // Fast HTML navigation caching with quick network timeout (instant offline fallback)
    {
        matcher: ({ request, url: { pathname }, sameOrigin }) =>
            request.destination === 'document' &&
            sameOrigin &&
            !pathname.startsWith('/api/'),
        handler: new NetworkFirst({
            cacheName: 'pages-html',
            plugins: [
                new ExpirationPlugin({
                    maxEntries: 32,
                    maxAgeSeconds: 7 * 24 * 60 * 60,
                }),
            ],
            networkTimeoutSeconds: 2,
        }),
    },
    ...defaultCache,
];

const serwist = new Serwist({
    precacheEntries: self.__SW_MANIFEST,
    skipWaiting: true,
    clientsClaim: true,
    navigationPreload: true,
    runtimeCaching: customCaching,
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
