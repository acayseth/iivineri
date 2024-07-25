'use client'

import React, { type FC, useContext } from 'react'

import { cn } from '@/libs/cn/cn.lib'
import { DaysOfWeek } from '@/components/iivineri/days-of-week/days-of-week'
import { TimeLeftUntilFriday } from '@/components/iivineri/time-left-until-friday/time-left-until-friday'
import { Today } from '@/components/iivineri/today/today'

interface IProps {}

const IiVineri: FC<Readonly<IProps>> = () => {
  return (
    <main className='py-6'>
      <DaysOfWeek />
      <Today />
      <TimeLeftUntilFriday />
    </main>
  )
}

export { IiVineri }
