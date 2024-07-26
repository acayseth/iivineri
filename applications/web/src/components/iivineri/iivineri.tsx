'use client'

import React, { type FC } from 'react'

import { DaysOfWeek } from '@/components/iivineri/days-of-week/days-of-week'
import { Today } from '@/components/iivineri/today/today'
import dynamic from 'next/dynamic'

const TimeLeftUntilFriday = dynamic(() => import('@/components/iivineri/time-left-until-friday/time-left-until-friday').then(m => m.TimeLeftUntilFriday), {
  loading: () => <p className="font-serif font-bold text-center text-default text-xl">Loading...</p>,
  ssr: false,
})


const IiVineri: FC<Readonly<{}>> = () => {
  return (
    <main className="py-6">
      <DaysOfWeek />
      <Today />
      <div className="py-3 h-20">
        <TimeLeftUntilFriday />
      </div>
    </main>
  )
}

export { IiVineri }
