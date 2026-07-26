import type { Metadata } from 'next';
import PwaRegister from './components/pwa-register';
import ThemeRegistry from './components/ThemeRegistry';
import './globals.css';

export const metadata: Metadata = {
    title: 'Fitness Tracker',
    description: 'maus',
    manifest: '/manifest.json',
    appleWebApp: {
        capable: true,
        statusBarStyle: 'default',
        title: 'Fitness Tracker',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" style={{ height: '100%', width: '100%' }}>
            <head>
                <link rel="manifest" href="/manifest.json" />
            </head>
            <body className="min-h-full flex flex-col m-0 p-0 bg-zinc-50 dark:bg-black">
                <ThemeRegistry>
                    <PwaRegister />
                    {children}
                </ThemeRegistry>
            </body>
        </html>
    );
}
