import type { ReactNode } from 'react'
import { RootProvider } from 'fumadocs-ui/provider'
import { I18nProvider, type Translations } from 'fumadocs-ui/i18n'
import { Inter } from 'next/font/google'
import { NextProvider } from 'fumadocs-core/framework/next'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'

import { nextIntlRouting } from '@/lib/i18n'
import cnMessages from '@/messages/cn.json'
import enMessages from '@/messages/en.json'

import '../global.css'

const inter = Inter({
  subsets: ['latin'],
})

const cn: Partial<Translations> = cnMessages.fuma
const en: Partial<Translations> = enMessages.fuma

// available languages that will be displayed on UI
// make sure `locale` is consistent with your i18n config
const locales = [
  {
    name: 'English',
    locale: 'en',
  },
  {
    name: '中文',
    locale: 'cn',
  },
]

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ lang: string }>
  children: ReactNode
}) {
  const lang = (await params).lang

  if (!hasLocale(nextIntlRouting.locales, lang)) {
    notFound()
  }

  return (
    <html lang={lang} className={inter.className} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <NextIntlClientProvider>
          <NextProvider>
            <I18nProvider
              locale={lang}
              locales={locales}
              translations={{ cn, en }[lang]}
            >
              <RootProvider>{children}</RootProvider>
            </I18nProvider>
          </NextProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
