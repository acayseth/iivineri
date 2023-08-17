'use client';

import { useFriday } from '@/_libs/clients/friday.hook';
import clsx from 'clsx';
import React from 'react';

export default function DayOfWeekComponent() {
  const { daysOfWeek, isFriday } = useFriday();
  return (
    <section className="py-0.5 my-2">
      <h1
        className={clsx(
          'text-5xl text-center font-bold tracking-tight text-white',
          { 'animate-pulse': isFriday },
        )}
      >{daysOfWeek}</h1>
    </section>
  );
}
