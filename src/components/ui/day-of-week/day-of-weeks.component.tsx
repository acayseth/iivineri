'use client';

import { useFriday } from '@/_libs/clients/friday.hook';
import clsx from 'clsx';
import React, { Fragment } from 'react';

export default function DayOfWeeksComponent() {
  const { daysOfWeekNum } = useFriday();
  const dayOfWeeks = [
    { id: 1, name: 'Lu' },
    { id: 2, name: 'Ma' },
    { id: 3, name: 'Mi' },
    { id: 4, name: 'Jo' },
    { id: 5, name: 'Vi' },
    { id: 6, name: 'Sî' },
    { id: 7, name: 'Du' },
  ];
  
  return (
    <section className="flex justify-center align-middle items-center py-0.5 my-2">
      <div className="w-1/2 px-5">
        <div className="grid grid-rows-7 grid-flow-col gap-4">
          {dayOfWeeks.map((v) => (
            <Fragment key={v.id}>
              <div className={clsx(
                { '-mt-1': v.id === daysOfWeekNum },
              )}>
                <p
                  className={clsx(
                    'border rounded-full bg-transparent font-serif text-sm font-bold px-2.5',
                    { 'line-through': v.id < daysOfWeekNum },
                    { 'border-blue-400 text-blue-400 underline': v.id === daysOfWeekNum },
                  )}
                >{v.name}</p>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
