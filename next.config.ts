// next.config.ts
import type { NextConfig } from 'next';

const withPWA = require('next-pwa')({
    dest: 'public',
    register: false,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
    fallbacks: {
        document: '/offline.html',
    },
});

const nextConfig: NextConfig = {
    devIndicators: false, // Hides the Next.js dev badge
    // Add any other Next.js config options here if needed
};

export default withPWA(nextConfig);
