import 'server-only'
import '@/app/globals.scss'

import moment from 'moment'
import { Onest } from 'next/font/google'
import { type ReactNode } from 'react'
import { useMessages, useTimeZone, type IntlProvider } from 'next-intl'

import { MainProvider } from '@/providers'
import { MainLayout } from '@/layouts/main.layout'
import { cn } from '@/libs/cn/cn.lib'

import type { MLayoyt } from '@/@types/modules/layout'

const onest = Onest({ subsets: ['latin'] })

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<MLayoyt.IProps>) {
  const currentWeekDay = moment().day()
  const leftTimeToWednesday = Math.round(
    moment(moment().isoWeekday(5).format('YYYY-MM-DD 00:00:00')).diff(
      moment(moment(), 'YYYY-MM-DD HH:MM:SS'),
      'seconds',
      true,
    ),
  )
  const messages = useMessages()
  const timeZone = useTimeZone()

  const getNextIntlProps = (): any => ({
    messages,
    timeZone,
    locale,
    now: new Date(),
    formats: {
      dateTime: {
        short: {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        },
      },
      number: {
        precise: {
          maximumFractionDigits: 5,
        },
      },
      list: {
        enumeration: {
          style: 'long',
          type: 'conjunction',
        },
      },
    },
  })

  return (
    <html lang={locale} suppressHydrationWarning={true}>
      <body className={cn(onest.className, 'h-full')}>
        <MainProvider
          nextIntl={getNextIntlProps()}
          iivineri={{ currentWeekDay, leftTimeToWednesday }}
        >
          <MainLayout>{children}</MainLayout>
        </MainProvider>
      </body>
    </html>
  )
}
