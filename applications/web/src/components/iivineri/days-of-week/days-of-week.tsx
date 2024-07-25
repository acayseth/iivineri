'use client'

import React, { type FC, useContext } from 'react'
import { cn } from '@/libs/cn/cn.lib'
import { AppContext } from '@/providers/app/app.context'
import { DayOfWeek } from '@/components/iivineri/days-of-week/day-of-week'

const DaysOfWeek: FC = () => {
  const { currentWeekDay, isFriday, dayOfWeeks } = useContext(AppContext)

  const handleActiveClasses = (index: number): string => {
    if (index !== currentWeekDay) {
      return ''
    }

    return cn(
      'font-bold border-2 border-content1',
      isFriday ? 'animate-spinner-ease-spin' : '',
    )
  }

  return (
    <div className='py-3'>
      <ul className='flex justify-center gap-4'>
        {dayOfWeeks.map((day, index) => (
          <DayOfWeek
            key={day}
            day={day}
            className={handleActiveClasses(index + 1)}
          />
        ))}
      </ul>
    </div>
  )
}

export { DaysOfWeek }
