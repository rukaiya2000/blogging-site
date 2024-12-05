import type { Metadata } from 'next'
import '../globals.css'

export const metadata: Metadata = {
  title: 'Auth',
  description: 'Login or Sign up for full accessability',
}

export default function RootLayout({children}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      {children}
    </main>
  );
}
