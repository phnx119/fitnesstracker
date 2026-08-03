import withSerwistInit from '@serwist/next';
import type { NextConfig } from 'next';

const withSerwist = withSerwistInit({
    swSrc: 'app/sw.ts',
    swDest: 'public/sw.js',
    disable: process.env.NODE_ENV === 'development',
});

const nextConfig: NextConfig = {
    reactStrictMode: true,
    experimental: {
        optimizePackageImports: ['@mui/material', '@mui/icons-material'],
    },
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },
};

export default withSerwist(nextConfig);
