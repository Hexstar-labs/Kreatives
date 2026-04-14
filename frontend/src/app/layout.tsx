import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Kreatives - Decentralized Content Platform',
  description: 'Monetize your content with blockchain subscriptions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
