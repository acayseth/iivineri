'use client';

import React from 'react';

import DayOfWeekComponent from '@/components/ui/day-of-week/day-of-week.component';
import DayOfWeeksComponent from '@/components/ui/day-of-week/day-of-weeks.component';
import CountDownComponent from '@/components/ui/count-down/count-down.component';
import TimelineListComponent from '@/components/ui/timeline/timeline-list.component';
import GiphyComponent from '@/components/ui/giphy/giphy';

import type { IGiphy } from '@/types/interfaces/giphy';

interface IProps {
  giphy: IGiphy;
}

export default function HomeComponent({ giphy }: IProps) {
  return (
    <>
      <DayOfWeeksComponent />
      <DayOfWeekComponent />
      <CountDownComponent />
      <GiphyComponent giphy={giphy} />
      <TimelineListComponent />
    </>
  );
}
