import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Manas | AI Engineer',
  description: '',
  generator: '',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
