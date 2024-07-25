'use client'

import { type FC } from 'react'

import { NavbarContent, NavbarItem } from '@/components/next-ui/navbar/navbar'
import { ThemeSwitcher } from '@/components/theme-switcher/theme-switcher'

interface IProps {}

const ContentLeftSide: FC<Readonly<IProps>> = () => {
  return (
    <NavbarContent justify='start'>
      <NavbarItem>
        <ThemeSwitcher />
      </NavbarItem>
    </NavbarContent>
  )
}

export { ContentLeftSide }
