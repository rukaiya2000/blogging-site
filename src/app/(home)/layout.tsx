import type { Metadata } from 'next'
import '../globals.css'
import Header from '@/components/common/header';
import Footer from '@/components/common/footer';

export const metadata: Metadata = {
    title: 'Open Media',
    description: 'Media accessible to everyone',
}

export default function RootLayout({
    children,
    modal,
}: {
    children: React.ReactNode;
    modal: React.ReactNode
}) {
    return (
        <main className="bg-primary flex flex-col justify-between min-h-screen space-y-16">
            <Header />
            {children}
            {modal}
            <div id="modal-root" />
            <Footer />
        </main>
    )
}