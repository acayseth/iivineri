'use client';

import React from 'react';
interface IProps {
  date: string;
  message: string;
}

const timelines = [
  { date: '2023', message: 'Realizat cu ajutorul: nodejs, typescript, nextjs, tailwindcss, git, docker, CI/CD' },
  { date: '2020', message: 'Realizat cu ajutorul: angular, angular-material' },
  { date: '2017', message: 'Realizat cu ajutorul tehnologiilor extraordinar de avansate: js, js, js, js, nodejs' },
  { date: '2012', message: 'Realizat cu ajutorul tehnologiilor extraordinar de avansate: Spring, Hibernate, HTML5, JMS, EhCache.' },
];

export default function TimelineListComponent() {
  return (
    <div className="flex flex-col rounded-xl transition-all shadown-sm shadow-gray-400/10 bg-neutral-800/90 bg-clip-border text-gray-700 shadow-md my-2 py-2">
      <div className="relative m-2 object-scale-down overflow-hidden rounded-xl">
        <ol className="border-l border-neutral-300 dark:border-neutral-500">
          {timelines.map((timeline, index) => (
            <TimeLap
                key={index}
                date={timeline.date}
                message={timeline.message}
            />
          ))}
        </ol>
      </div>
    </div>
  );
}

function TimeLap({ date, message }: IProps) {
  return (
    <li>
      <div className="flex-start flex items-center pt-0.5">
      <div className="-ml-[5px] mr-3 h-[9px] w-[9px] rounded-full bg-white"></div>
        <p className="text-sm text-neutral-500 dark:text-neutral-300">{date}</p>
      </div>
      <div className="mb-3 ml-4 mt-1">
        <p className="mb-0 text-neutral-500 dark:text-neutral-300">{message}</p>
      </div>
    </li>
  );
}
