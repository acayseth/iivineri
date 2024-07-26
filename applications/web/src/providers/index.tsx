'use client'

import React, { type FC, type ReactNode } from 'react'

import { AppProvider } from '@/providers/app/app.provider'
import { NextThemeProvider } from '@/providers/next-theme/next-theme.provicer'
import { ReactQueryProvider } from '@/providers/react-query/react-query.provider'

interface IProps {
  children: ReactNode
}

const MainProvider: FC<IProps> = ({ children }) => {
  return (
    <AppProvider>
      <NextThemeProvider>
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </NextThemeProvider>
    </AppProvider>
  )
}

export { MainProvider }
