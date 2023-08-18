'use client';

import moment from 'moment';
import { useEffect, useState } from 'react';

import { EDaysOfWeek } from '@/types/enums/days-of-week';

export function useTimeLeft() {
  const [leftTime, setLeftTime] = useState<number>(0);
  
  useEffect(() => {
    setLeftTime(
      Math.round(
        moment(moment().isoWeekday(5).format('YYYY-MM-DD 00:00:00')).diff(
          moment(moment(), 'YYYY-MM-DD HH:MM:SS'), 'seconds', true,
        ),
      ),
    );
  }, []);
  
  return { leftTime };
}

export function useFriday() {
  const [isFriday] = useState<boolean>(moment().day() === 5);
  const [daysOfWeek] = useState<string>(EDaysOfWeek[moment().day()]);
  const [daysOfWeekNum] = useState<number>(moment().day());
  
  return { daysOfWeek, isFriday, daysOfWeekNum };
}
