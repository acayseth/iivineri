'use client'

import React, { type FC, type ReactNode } from 'react'
import { ThemeProvider } from 'next-themes'


interface IProps {
  children: ReactNode;
}

const NextThemeProvider: FC<IProps> = ({ children }) => {
  return (
    <ThemeProvider
      attribute="class"
      enableSystem={true}
      defaultTheme="dark"
    >
      {children}
    </ThemeProvider>
  )
}

export {
  NextThemeProvider,
}