import type { NextConfig } from 'next';
// @ts-expect-error - next-pwa does not ship official type declarations
import withPWAInit from 'next-pwa';

const withPWA = withPWAInit({
    dest: 'public',
    register: false,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
    fallbacks: {
        document: '/offline.html',
    },
});

const nextConfig: NextConfig = {
    devIndicators: false,
    reactStrictMode: true,
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },
};

export default withPWA(nextConfig);
