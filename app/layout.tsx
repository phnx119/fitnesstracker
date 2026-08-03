import type { Metadata, Viewport } from 'next';
import ThemeRegistry from './_helpers/ThemeRegistry';
import './globals.css';

export const viewport: Viewport = {
    themeColor: '#000000',
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: 'cover',
};

export const metadata: Metadata = {
    title: 'Fitness Tracker',
    description: 'maus',
    manifest: '/manifest.json',
    appleWebApp: {
        capable: true,
        statusBarStyle: 'black-translucent',
        title: 'The Deep',
    },
    icons: {
        apple: '/agentpatrick.png',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="h-full w-full">
            <body className="h-[100dvh] w-full flex flex-col m-0 p-0 overflow-hidden bg-zinc-50 dark:bg-black">
                <ThemeRegistry>{children}</ThemeRegistry>
            </body>
        </html>
    );
}
