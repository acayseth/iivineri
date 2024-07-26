'use client'

import React, { FC, type ReactNode } from 'react'
import { AppContext, _MESSAGES_ } from '@/providers/app/app.context'
import moment from 'moment'

export interface IProps {
  children: ReactNode;
}

const AppProvider: FC<Readonly<IProps>> = ({ children }) => {
  const getTodayMessage = (currentWeekDay: number) => {
    return _MESSAGES_[currentWeekDay]!
  }

  const currentWeekDay = moment().day()
  const leftTimeToWednesday = Math.round(
    moment(moment().isoWeekday(5).format('YYYY-MM-DD 00:00:00')).diff(
      moment(moment(), 'YYYY-MM-DD HH:MM:SS'),
      'seconds',
      true,
    ),
  )

  return (
    <AppContext.Provider
      value={{
        currentWeekDay,
        leftTimeToWednesday,
        isFriday: currentWeekDay === 5,
        todayMessage: getTodayMessage(currentWeekDay),
        dayOfWeeks: ['Lu', 'Ma', 'Mi', 'Jo', 'Vi', 'Sî', 'Du']
      }}>
      {children}
    </AppContext.Provider>
  )
}

export { AppProvider }
