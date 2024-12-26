import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { Geist, Geist_Mono } from 'next/font/google'

import '@/assets/main.scss'
import { BackgroundComponent } from '@/components/background'
import { DarkModeComponent } from '@/components/darkmode.component'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Manager APP',
  description: 'A manager app for your business'
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()
  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen flex flex-col flex-nowrap bg-base`}
      >
        <main className="flex flex-col h-full relative z-10">
          <header className="flex justify-between items-center p-4 bg-highlight shrink-0">
            <h1 className="text-2xl font-bold text-primary-inverted">
              Manager APP
            </h1>

            <DarkModeComponent display="fixed" />
          </header>

          <section className="flex flex-col h-full relative z-10">
            <NextIntlClientProvider messages={messages}>
              {children}
            </NextIntlClientProvider>
          </section>
        </main>

        <BackgroundComponent />
      </body>
    </html>
  )
}
