'use client'

import React, { type FC } from 'react'

import { Navbar } from '@/components/next-ui/navbar/navbar'
import { ContentLeftSide } from '@/components/navbar/content-left-side/content-left-side'
import { ContentCenterSide } from '@/components/navbar/content-center-side/content-center-side'
import { ContentRightSide } from '@/components/navbar/content-right-side/content-right-side'
interface IProps {}

const NavBar: FC<Readonly<IProps>> = () => {
  return (
    <Navbar className='rounded-bl-md rounded-br-md shadow-content4 shadow-md' classNames={{
      wrapper: 'px-4'
    }}>
      <ContentLeftSide />
      <ContentCenterSide />
      <ContentRightSide />
    </Navbar>
  )
}

export { NavBar }
