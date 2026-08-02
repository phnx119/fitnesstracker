// next.config.ts
import type { NextConfig } from 'next';

const withPWA = require('next-pwa')({
    dest: 'public',
    register: false,
    skipWaiting: true,
    clientsClaim: true,
    disable: process.env.NODE_ENV === 'development',
    fallbacks: {
        document: '/offline.html',
        image: '/offline.html',
    },
});

const nextConfig: NextConfig = {
    devIndicators: false,
    experimental: {
        optimizePackageImports: ['@mui/material', '@mui/icons-material'],
    },
};

export default withPWA(nextConfig);
