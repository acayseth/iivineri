'use client'

import React, { type FC, useContext } from 'react'
import Countdown, { CountdownRenderProps } from 'react-countdown'
import { AppContext } from '@/providers/app/app.context'

interface IProps {}

const TimeLeftUntilFriday: FC<Readonly<IProps>> = () => {
  const { leftTimeToWednesday } = useContext(AppContext)

  if (leftTimeToWednesday <= 0) {
    return <></>
  }

  return (
    <div className='py-3'>
      <Countdown
        now={Date.now}
        date={Date.now() + leftTimeToWednesday * 1000}
        autoStart={true}
        onComplete={(props: any) => {
          console.log({ props })
        }}
        renderer={({ days, hours, minutes, seconds }) => (
          <>
            <p className='font-serif font-bold text-center text-default text-xl'>
              Până vineri a mai rămas
            </p>
            <p className='font-serif font-bold text-center text-default text-xl'>
              <span className='underline decoration-1'>
                {days !== 0 &&
                  (days === 1 ? (
                    <span className='px-0.5'>O zi,</span>
                  ) : (
                    <span className='px-0.5'>{days} zile,</span>
                  ))}
                {hours !== 0 &&
                  (hours === 1 ? (
                    <span className='px-0.5'>O oră,</span>
                  ) : (
                    <span className='px-0.5'>{hours} ore,</span>
                  ))}
                {minutes !== 0 &&
                  (minutes === 1 ? (
                    <span className='px-0.5'>o minută</span>
                  ) : (
                    <span className='px-0.5'>{minutes} minute</span>
                  ))}
                <span className='px-0.5'>și {seconds} secunde</span>
              </span>
            </p>
          </>
        )}
      />
    </div>
  )
}

export { TimeLeftUntilFriday }
