'use client';

import React from 'react';

import MediaContentComponent from '@/components/ui/media/media-content.component';
import MediaControlComponent from '@/components/ui/media/media-control.component';
import type { IGiphy } from '@/types/interfaces/giphy';

interface IProps {
  giphy: IGiphy;
}

export default function GiphyComponent({ giphy }: IProps) {
  return (
    <section className="flex flex-col rounded-xl transition-all shadown-sm shadow-gray-400/10 bg-neutral-800/90 bg-clip-border text-gray-700 shadow-md my-2 py-2">
      <div className="relative m-4 h-[300px] md:h-[400px] object-scale-down overflow-hidden rounded-xl">
        <MediaContentComponent giphy={giphy} type={'mp4'} />
      </div>
      <div className="px-2 pb-2 flex flex-row justify-between items-center">
        <MediaControlComponent giphyId={giphy.data.id} />
      </div>
    </section>
  );
}
