import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'Open Media',
    description: 'Media accessible to everyone',
}

export default function RootLayout({
    children,
    modal
}: {
    children: React.ReactNode;
    modal: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                {children}
                {modal}
                <div id="modal-root" />
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    )
}
