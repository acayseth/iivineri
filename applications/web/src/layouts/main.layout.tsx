'use client'

import React, { type FC, type ReactNode } from 'react'

import { IiVineri } from '@/components/iivineri/iivineri'
import { NavBar } from '@/components/navbar/navbar'
import { PageLayout } from '@/layouts/page.layout'
import { Switch } from '@/components/next-ui/switch/switch'


interface IProps {
  children: ReactNode
}

const MainLayout: FC<Readonly<IProps>> = ({ children }) => {
  return (
    <>
      <NavBar />
      <IiVineri />
      <PageLayout>
        <div className="bg-gray-500/50">
          <Switch defaultSelected aria-label="Automatic updates"/>
        </div>
        {children}
      </PageLayout>
    </>
  )
}

export { MainLayout }
