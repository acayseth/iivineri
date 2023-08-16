'use client';

import clsx from 'clsx';
import React from 'react';

import { useHelperHook } from '@/_libs/clients/helper.hook';

interface IProps {
  giphyId: string;
}

export default function MediaControlComponent({ giphyId }: IProps) {
  const { copy2Clipboard, refreshPage } = useHelperHook();
  return (
    <>
      <button
        type="button"
        aria-label="Compie Link"
        className={clsx(
          'select-none rounded-md bg-white hover:bg-gray-100/80 w-1/2 py-3 px-6 text-center align-middle font-sans text-md font-bold text-black transition-all',
          'focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none',
        )}
        onClick={() => copy2Clipboard(giphyId)}
      >Copy gif link</button>
      
      <div className="px-2"></div>
      
      <button
        type="button"
        aria-label="Alta gifca"
        className={clsx(
          'select-none rounded-md bg-white hover:bg-gray-100/80 w-1/2 py-3 px-6 text-center align-middle font-sans text-md font-bold text-black transition-all',
          'focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none',
        )}
        onClick={refreshPage}
      >Altă gif-că</button>
    </>
  );
}
