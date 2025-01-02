import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { Geist, Geist_Mono } from 'next/font/google'

import '@/assets/main.scss'
import { BackgroundComponent } from '@/components/background'
import { DarkModeComponent } from '@/components/darkmode.component'
import { HeaderComponent } from '@/components/header.component'

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

  const messages = await getMessages()
  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen flex flex-col flex-nowrap bg-base`}
      >
        <NextIntlClientProvider messages={messages}>
          <main className="flex flex-col h-full relative z-10 overflow-x-hidden">
            <HeaderComponent />

            <section className="flex flex-col h-full relative z-10">
              {children}
            </section>
          </main>
        </NextIntlClientProvider>

        <BackgroundComponent />
        <DarkModeComponent display="fixed" />
      </body>
    </html>
  )
}
