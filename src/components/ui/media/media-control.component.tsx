'use client';

import clsx from 'clsx';
import React from 'react';
import { HiMiniArrowUturnRight } from 'react-icons/hi2';

import { useHelperHook } from '@/_libs/clients/helper.hook';

interface IProps {
  giphyId?: string;
}

export default function MediaControlComponent({ giphyId }: IProps) {
  const { copy2Clipboard, refreshPage } = useHelperHook();
  return (
    <div className="grid grid-cols-2 gap-4 w-full">
      <button
        type="button"
        aria-label="Compie Link"
        className={clsx(
          'rounded-md bg-white hover:bg-gray-100/80 py-3 px-6 font-sans text-md font-bold text-black',
          'focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none',
        )}
        onClick={() => copy2Clipboard(giphyId)}
      >
        <span>Copy gif link</span>
      </button>

      <button
        type="button"
        aria-label="Alta gifca"
        className={clsx(
          'rounded-md bg-white hover:bg-gray-100/80 py-3 px-6 font-sans text-md font-bold text-black',
          'focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none',
          'ring-1 ring-black'
        )}
        onClick={() => refreshPage(giphyId)}
      >
        <span>Altă gif-că</span>
      </button>
    </div>
  );
}
