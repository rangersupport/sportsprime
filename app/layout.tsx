import type { Metadata, Viewport } from 'next'
import { Geist } from 'next/font/google'
import { Fraunces, DM_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'SportsPrime | La Plataforma de Deportes de Colombia',
    template: '%s | SportsPrime',
  },
  description:
    'Reserva canchas de pádel, tenis, fútbol y más en segundos. La plataforma deportiva más completa de Colombia. Peralta Prime.',
  keywords: [
    'pádel Colombia',
    'reservar cancha',
    'tenis Cúcuta',
    'fútbol Colombia',
    'entrenadores deportivos',
    'torneos deportivos',
    'SportsPrime',
    'Coach Peralta',
  ],
  authors: [{ name: 'SportsPrime SAS' }],
  creator: 'SportsPrime',
  publisher: 'SportsPrime SAS',
  metadataBase: new URL('https://sportsprime.co'),
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: 'https://sportsprime.co',
    siteName: 'SportsPrime',
    title: 'SportsPrime | La Plataforma de Deportes de Colombia',
    description:
      'Reserva canchas de pádel, tenis, fútbol y más en segundos. Peralta Prime.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SportsPrime - La Plataforma de Deportes de Colombia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SportsPrime | La Plataforma de Deportes de Colombia',
    description: 'Reserva canchas de pádel, tenis, fútbol y más en segundos.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0A3D2E',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es-CO"
      className={`${geist.variable} ${fraunces.variable} ${dmMono.variable} bg-sp-cream`}
    >
      <body className="font-sans antialiased overflow-x-hidden">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
