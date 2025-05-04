// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import { Poppins, Playfair_Display } from 'next/font/google'
import { SpeedInsights } from '@vercel/speed-insights/next'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'Hadi&Co',
  description: 'Professional strata management services for your property',
  icons: {
    icon: '/Hadi&Co.png',
    apple: '/Hadi&Co.png',
    shortcut: '/Hadi&Co.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      </head>
      <body className={`${poppins.variable} ${playfair.variable} font-sans bg-white text-gray-800`}>
        {/*
          If you want a global navbar or footer for ALL pages,
          you could place them here, e.g. <Navbar /> / <Footer />
        */}
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}