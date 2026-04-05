import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AetherDB Docs — AI-Native Database Infrastructure',
  description: 'Complete documentation for AetherDB — the database built for AI applications',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
