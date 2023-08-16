'use client';

import React from 'react';

interface IProps {
  date: string;
  message: string;
}

export default function TimelineComponent({ date, message }: IProps) {
  return (
    <li>
      <div className="flex-start flex items-center pt-0.5">
        <div className="-ml-[5px] mr-3 h-[9px] w-[9px] rounded-full bg-white"></div>
        <p className="text-sm text-neutral-500 dark:text-neutral-300">{date}</p>
      </div>
      <div className="mb-3 ml-4 mt-1">
        <p className="mb-0.5 text-neutral-500 dark:text-neutral-300">{message}</p>
      </div>
    </li>
  );
}
