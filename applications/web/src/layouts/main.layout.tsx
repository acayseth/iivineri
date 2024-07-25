'use client'

import React, { type FC, type ReactNode } from 'react'

import { IiVineri } from '@/components/iivineri/iivineri'
import { NavBar } from '@/components/navbar/navbar'
import { PageLayout } from '@/layouts/page.layout'

interface IProps {
  children: ReactNode
}

const MainLayout: FC<Readonly<IProps>> = ({ children }) => {
  return (
    <>
      <NavBar />
      <IiVineri />
      <PageLayout>{children}</PageLayout>
    </>
  )
}

export { MainLayout }
