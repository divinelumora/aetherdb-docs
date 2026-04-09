import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AetherDB Docs — AI-Native Database Infrastructure',
  description: 'Complete documentation for AetherDB — the database built for AI applications',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.png', type: 'image/png', sizes: '32x32' },
    ],
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
