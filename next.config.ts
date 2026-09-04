import withSerwistInit from '@serwist/next';
import type { NextConfig } from 'next';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const getFileHash = (file: string) =>
    crypto.createHash('md5').update(fs.readFileSync(file)).digest('hex');

const getPublicPrecacheEntries = () => {
    const publicDir = path.resolve(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) return [];
    const files = fs.readdirSync(publicDir, {
        recursive: true,
        withFileTypes: true,
    });
    const entries: { url: string; revision: string }[] = [];
    for (const file of files) {
        if (file.isFile()) {
            const dirEntry = file as {
                parentPath?: string;
                path?: string;
            };
            const dir = dirEntry.parentPath || dirEntry.path || publicDir;
            const fullPath = path.join(dir, file.name);
            const relativePath = path
                .relative(publicDir, fullPath)
                .replace(/\\/g, '/');
            if (
                !relativePath.startsWith('swe-worker-') &&
                !relativePath.endsWith('.map') &&
                relativePath !== 'sw.js' &&
                relativePath !== 'pspsps.jpg'
            ) {
                entries.push({
                    url: '/' + relativePath,
                    revision: getFileHash(fullPath),
                });
            }
        }
    }
    return entries;
};

const withSerwist = withSerwistInit({
    swSrc: 'app/sw.ts',
    swDest: 'public/sw.js',
    disable: process.env.NODE_ENV === 'development',
    additionalPrecacheEntries: getPublicPrecacheEntries(),
});

const nextConfig: NextConfig = {
    reactStrictMode: true,
    experimental: {
        optimizePackageImports: [
            '@mui/material',
            '@mui/icons-material',
            '@tabler/icons-react',
            'dexie',
        ],
    },
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },
};

export default withSerwist(nextConfig);
