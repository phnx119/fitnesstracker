import type { NextConfig } from 'next';
// @ts-expect-error - next-pwa does not ship official type declarations
import withPWAInit from 'next-pwa';

const withPWA = withPWAInit({
    dest: 'public',
    register: false,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
    cacheOnFrontEndNav: true,
    reloadOnOnline: false,
    fallbacks: {
        document: '/offline.html',
    },
    runtimeCaching: [
        {
            urlPattern:
                /^https?:\/\/.*\.(?:png|jpg|jpeg|svg|gif|webp|avif|ico|woff|woff2|ttf|css|js)$/i,
            handler: 'CacheFirst',
            options: {
                cacheName: 'static-assets-cache',
                expiration: {
                    maxEntries: 200,
                    maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
                },
            },
        },
        {
            urlPattern: ({ request }: { request: Request }) =>
                request.mode === 'navigate',
            handler: 'NetworkFirst',
            options: {
                cacheName: 'pages-cache',
                networkTimeoutSeconds: 2,
                expiration: {
                    maxEntries: 50,
                    maxAgeSeconds: 30 * 24 * 60 * 60,
                },
            },
        },
    ],
});

const nextConfig: NextConfig = {
    devIndicators: false,
    reactStrictMode: true,
    experimental: {
        optimizePackageImports: ['@mui/material', '@mui/icons-material'],
    },
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },
};

export default withPWA(nextConfig);
