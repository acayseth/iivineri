'use client'

import { cn } from '@/libs/cn/cn.lib'
import React, { FC, Fragment, ReactNode } from 'react'

export interface IProps {
  day: string
  className?: string
}

const DayOfWeek: FC<Readonly<IProps>> = ({ day, className }) => {
  return (
    <li
      className={cn(
        'rounded-full w-8 h-8 bg-content4 flex justify-center items-center',
        className,
      )}
    >
      <p className='font-sans'>{day}</p>
    </li>
  )
}

export { DayOfWeek }
