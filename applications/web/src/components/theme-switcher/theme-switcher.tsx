'use client'

import React, { type FC, useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { FaMoon, FaSun } from 'react-icons/fa6'

import { cn } from '@/libs/cn/cn.lib'
import { Switch } from '@/components/next-ui/switch/switch'
import { Skeleton } from '@/components/next-ui/skeleton/skeleton'
import { useThemeSwithcerHook } from '@/hooks/theme-switcher/theme-switcher.hook'

interface IProps {}

const ThemeSwitcher: FC<Readonly<IProps>> = () => {
  const { mounted, theme, toggleTheme } = useThemeSwithcerHook()

  if (!mounted) {
    return (
      <div className='w-full flex items-center gap-3'>
        <Skeleton className='rounded-full w-14 h-8 opacity-20' />
      </div>
    )
  }

  return (
    <Switch
      name='theme-switcher'
      classNames={{
        wrapper: cn('shadow-lg border border-default'),
        thumb: ['bg-white', 'dark:bg-black'],
      }}
      size='lg'
      color='default'
      isSelected={theme === 'dark'}
      onValueChange={toggleTheme}
      startContent={<FaSun />}
      endContent={<FaMoon />}
      thumbIcon={({ isSelected }) => (
        <>
          {isSelected && <FaMoon className={'text-black dark:text-white'} />}
          {!isSelected && <FaSun className={'text-black dark:text-white'} />}
        </>
      )}
    />
  )
}

export { ThemeSwitcher }
