// next.config.ts
import type { NextConfig } from 'next';

const withPWA = require('next-pwa')({
    dest: 'public',
    register: false,
    skipWaiting: true,
    clientsClaim: true,
    disable: process.env.NODE_ENV === 'development',
    buildExcludes: [/app-build-manifest\.json$/],
    fallbacks: {
        document: '/offline.html',
        image: '/offline.html',
    },
    additionalManifestEntries: [
        { url: '/', revision: null },
        { url: '/training', revision: null },
        { url: '/training/all', revision: null },
        { url: '/personal', revision: null },
        { url: '/settings', revision: null },
        { url: '/dbviewer', revision: null },
        { url: '/offline.html', revision: null },
    ],
    runtimeCaching: [
        {
            urlPattern: ({ url }: { url: URL }) =>
                url.origin === self.location.origin &&
                (url.pathname.startsWith('/_next/static/') ||
                    url.pathname === '/manifest.json' ||
                    url.pathname === '/offline.html'),
            handler: 'StaleWhileRevalidate',
            options: {
                cacheName: 'app-shell',
                expiration: {
                    maxEntries: 200,
                    maxAgeSeconds: 60 * 60 * 24 * 30,
                },
            },
        },
        {
            urlPattern: ({ url }: { url: URL }) =>
                url.origin === self.location.origin &&
                url.pathname.startsWith('/_next/data/'),
            handler: 'CacheFirst',
            options: {
                cacheName: 'data',
                expiration: {
                    maxEntries: 100,
                    maxAgeSeconds: 60 * 60 * 24 * 30,
                },
            },
        },
        {
            urlPattern: ({ url }: { url: URL }) =>
                url.origin === self.location.origin &&
                (url.pathname.endsWith('.png') ||
                    url.pathname.endsWith('.jpg') ||
                    url.pathname.endsWith('.jpeg') ||
                    url.pathname.endsWith('.svg') ||
                    url.pathname.endsWith('.webp')),
            handler: 'CacheFirst',
            options: {
                cacheName: 'images',
                expiration: {
                    maxEntries: 100,
                    maxAgeSeconds: 60 * 60 * 24 * 30,
                },
            },
        },
        {
            urlPattern: ({ request, url }: { request: Request; url: URL }) =>
                request.destination === 'document' &&
                url.origin === self.location.origin,
            handler: 'CacheFirst',
            options: {
                cacheName: 'pages',
                expiration: {
                    maxEntries: 100,
                    maxAgeSeconds: 60 * 60 * 24 * 30,
                },
            },
        },
    ],
});

const nextConfig: NextConfig = {
    devIndicators: false,
    experimental: {
        optimizePackageImports: ['@mui/material', '@mui/icons-material'],
    },
};

export default withPWA(nextConfig);
