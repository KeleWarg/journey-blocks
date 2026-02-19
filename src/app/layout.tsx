import type { Metadata } from 'next'
import { Work_Sans } from 'next/font/google'
import localFont from 'next/font/local'
import '@/styles/globals.css'

const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-work-sans',
  weight: ['400', '500', '600', '700'],
})

const schnyderS = localFont({
  src: '../fonts/SchnyderS-Bold.otf',
  weight: '700',
  style: 'normal',
  variable: '--font-schnyder',
  display: 'swap',
  fallback: ['Georgia', 'serif'],
})

export const metadata: Metadata = {
  title: 'Compare Moving Quotes - Forbes Advisor',
  description: 'Compare free moving quotes from top-rated movers in your area. Save time and money on your next move.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${workSans.variable} ${schnyderS.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
