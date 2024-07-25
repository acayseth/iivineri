'use client'

import { createContext } from 'react'
import type { IProps as IProviderProps } from '@/providers/app/app.provider'

interface IProps extends Omit<IProviderProps, 'children'> {
  locale: string
  isFriday: boolean
  todayMessage: string
  dayOfWeeks: string[]
}

const _MESSAGES_ = [
  'Nu, uăi! Îi duminică.',
  'Nu, uăi! Îi luni.',
  'Nu, uăi! Îi marți.',
  'Nu, uăi! Îi miercuri.',
  'Nu, uăi! Îi jioi.',
  'Da, uăi !!!',
  'Nu, uăi! Îi sâmbătă.',
]

const AppContext = createContext<IProps>({
  locale: '',
  currentWeekDay: 0,
  leftTimeToWednesday: 0,
  isFriday: false,
  todayMessage: '',
  dayOfWeeks: [],
})

export { _MESSAGES_, AppContext }
