'use client'

import React, { type FC, type ReactNode, type ComponentProps } from 'react'
import { NextIntlClientProvider, type IntlProvider } from 'next-intl'

import { AppProvider } from '@/providers/app/app.provider'
import { NextThemeProvider } from '@/providers/next-theme/next-theme.provicer'
import { ReactQueryProvider } from '@/providers/react-query/react-query.provider'

interface IProps {
  children: ReactNode
  nextIntl: ComponentProps<typeof IntlProvider>
  iivineri: {
    currentWeekDay: number
    leftTimeToWednesday: number
  }
}

const MainProvider: FC<IProps> = ({
  children,
  nextIntl,
  iivineri: { currentWeekDay, leftTimeToWednesday },
}) => {
  return (
    <AppProvider
      locale={nextIntl.locale}
      currentWeekDay={currentWeekDay}
      leftTimeToWednesday={leftTimeToWednesday}
    >
      <NextIntlClientProvider {...nextIntl}>
        <NextThemeProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </NextThemeProvider>
      </NextIntlClientProvider>
    </AppProvider>
  )
}

export { MainProvider }
