'use client';

import React from 'react';

import CountDownComponent from '@/components/ui/count-down/count-down.component';
import MediaContentComponent from '@/components/ui/media/media-content.component';
import MediaControlComponent from '@/components/ui/media/media-control.component';
import TimelineComponent from '@/components/ui/timeline/timeline.component';

import type { IGiphy } from '@/types/interfaces/giphy';

interface IProps {
  giphy: IGiphy;
}

const timelines = [
  { date: '2023', message: 'Realizat cu ajutorul: nodejs, typescript, nextjs, tailwindcss, git, docker, CI/CD' },
  { date: '2020', message: 'Realizat cu ajutorul: angular, angular-material' },
  { date: '2017', message: 'Realizat cu ajutorul tehnologiilor extraordinar de avansate: js, js, js, js, nodejs' },
  { date: '2012', message: 'Realizat cu ajutorul tehnologiilor extraordinar de avansate: Spring, Hibernate, HTML5, JMS, EhCache.' },
];

export default function HomeComponent({ giphy }: IProps) {
  return (
    <>
      <CountDownComponent />
      <section className="relative flex flex-col rounded-xl transition-all shadown-sm shadow-gray-400/10 bg-neutral-800/90 bg-clip-border text-gray-700 shadow-md">
        <div className="relative m-4 h-[300px] md:h-[400px] object-scale-down overflow-hidden rounded-xl">
          <MediaContentComponent giphy={giphy} type={'mp4'} />
        </div>
        <div className="px-4 pb-4 flex flex-row justify-between items-center">
          <MediaControlComponent giphyId={giphy.data.id} />
        </div>
      </section>
      <section className="relative flex flex-col rounded-xl transition-all shadown-sm shadow-gray-400/10 bg-neutral-800/90 bg-clip-border text-gray-700 shadow-md my-2.5">
        <div className="relative m-4 object-scale-down overflow-hidden rounded-xl">
          <ol className="border-l border-neutral-300 dark:border-neutral-500">
            {timelines.map((timeline, index) => (
              <TimelineComponent key={index} date={timeline.date} message={timeline.message} />
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
