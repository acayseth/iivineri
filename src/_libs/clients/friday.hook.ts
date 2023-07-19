'use client';

import { EDaysOfWeek } from '@/types/enums/days-of-week';
import moment from 'moment';
import { useEffect, useState } from 'react';

export function useFriday() {
  const [leftTime, setLeftTime] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFriday] = useState<boolean>(moment().day() === 5);
  const [daysOfWeek] = useState<string>(EDaysOfWeek[moment().day()]);
  
  useEffect(() => {
    setLeftTime(
      Math.round(
        moment(moment().isoWeekday(5).format('YYYY-MM-DD 00:00:00')).diff(
          moment(moment(), 'YYYY-MM-DD HH:MM:SS'), 'seconds', true,
        ),
      ),
    );
    setLoading(false);
  });
  
  return { loading, leftTime, daysOfWeek, isFriday };
}
