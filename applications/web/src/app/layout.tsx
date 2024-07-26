import 'server-only'
import '@/app/globals.scss'

import {type ReactNode } from 'react'
import { Onest } from 'next/font/google'

import { MainProvider } from '@/providers'
import { MainLayout } from '@/layouts/main.layout'
import { cn } from '@/libs/cn/cn.lib'

const onest = Onest({ subsets: ['latin'] })

interface IProps {
  children: ReactNode
}

export default function RootLayout({ children }: Readonly<IProps>) {
  return (
    <html lang='ro' suppressHydrationWarning={true}>
      <body className={cn(onest.className, 'h-full')}>
        <MainProvider>
          <MainLayout>{children}</MainLayout>
        </MainProvider>
      </body>
    </html>
  )
}
