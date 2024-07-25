'use client';

import React, { FC, type ReactNode } from 'react';
import { AppContext, _MESSAGES_ } from '@/providers/app/app.context';

export interface IProps {
  children: ReactNode;
  currentWeekDay: number;
  leftTimeToWednesday: number;
  locale: string;
}

const AppProvider: FC<Readonly<IProps>> = ({ children, currentWeekDay, leftTimeToWednesday, locale }) => {
  const getTodayMessage = (currentWeekDay: number) => {
    return _MESSAGES_[currentWeekDay]!;
  };

  return (
    <AppContext.Provider
      value={{
        locale,
        currentWeekDay,
        leftTimeToWednesday,
        isFriday: currentWeekDay === 5,
        todayMessage: getTodayMessage(currentWeekDay),
        dayOfWeeks: ['Lu', 'Ma', 'Mi', 'Jo', 'Vi', 'Sî', 'Du'],
      }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider };
