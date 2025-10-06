import './globals.css'
import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import Toast from '@/components/Toast'
import { LogoutProvider } from '@/lib/contexts/LogoutContext'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  title: 'Synk - Your Productivity Hub',
  description: 'Manage tasks, notes, files, and events all in one place',
  icons: {
    icon: '/Synk.svg',
    shortcut: '/Synk.svg',
    apple: '/Synk.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${inter.className}`}>
        <LogoutProvider>
          {children}
          <Toast />
        </LogoutProvider>
      </body>
    </html>
  )
}

