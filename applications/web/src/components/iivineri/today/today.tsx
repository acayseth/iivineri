'use client'

import React, { type FC, useContext } from 'react'
import { AppContext } from '@/providers/app/app.context'

interface IProps {}

const Today: FC<Readonly<IProps>> = () => {
  const { todayMessage } = useContext(AppContext)

  return (
    <section className='py-3'>
      <h1 className='text-center text-5xl font-bold'>{todayMessage}</h1>
    </section>
  )
}

export { Today }
