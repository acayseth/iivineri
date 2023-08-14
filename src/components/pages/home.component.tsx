'use client';

import { useFriday } from '@/_libs/clients/friday.hook';
import { useHelperHook } from '@/_libs/clients/helper.hook';
import RendererCountDown from '@/components/count-down/count-down.component';
import { IGiphy } from '@/types/interfaces/giphy';
import clsx from 'clsx';
import React from 'react';
import Countdown from 'react-countdown';

interface IProps {
  giphy: IGiphy;
}

export default function HomeComponent({ giphy }: IProps) {
  const { leftTime, loading, daysOfWeek, isFriday } = useFriday();
  const { copy2Clipboard, refreshPage } = useHelperHook();
  return (
    <>
      <header className="text-center relative pt-2.5 pb-16">
        <h1
          className={
            clsx(
              'text-5xl font-bold tracking-tight text-white',
              { 'animate-pulse': isFriday },
            )}
        >{daysOfWeek}</h1>
        {(!loading && leftTime > 0) && <Countdown
            now={Date.now}
            date={Date.now() + (leftTime * 1000)}
            renderer={RendererCountDown}
        />}
      </header>
      <section className="relative flex flex-col rounded-xl transition-all shadown-sm shadow-gray-400/10 bg-neutral-800/90 bg-clip-border text-gray-700 shadow-md">
        <div className="relative m-4 h-[300px] md:h-[400px] object-scale-down overflow-hidden rounded-xl">
          <div>
            <video
              className="absolute z-10 object-contain w-full h-full cursor-pointer"
              width={giphy?.data?.images?.original_mp4.width}
              height={giphy?.data?.images?.original_mp4.height}
              autoPlay loop
              onClick={refreshPage}
            >
              <source src={giphy?.data?.images?.original_mp4.mp4} type="video/mp4" />
            </video>
            <div className="w-full z-0 h-full absolute flex flex-col justify-center items-center">
              <svg className="animate-spin -ml-1 mr-3 h-20 w-20 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="sr-only">loading</span>
            </div>
          </div>
        </div>
        <div className="px-4 pb-4 flex flex-row justify-between items-center">
          <button
            aria-label="compie link"
            className={clsx(
              'select-none rounded-md bg-white hover:bg-gray-100/80 w-1/2 py-3 px-6 text-center align-middle font-sans text-md font-bold text-black transition-all',
              'focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none',
            )}
            type="button"
            onClick={() => copy2Clipboard(giphy.data.id)}
          >
            Copy gif link
          </button>
          <div className="px-2"></div>
          <button
            aria-label="Alta gifca"
            className={clsx(
              'select-none rounded-md bg-white hover:bg-gray-100/80 w-1/2 py-3 px-6 text-center align-middle font-sans text-md font-bold text-black transition-all',
              'focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none',
            )}
            type="button"
            onClick={refreshPage}
          >
            Altă gif-că
          </button>
        </div>
      </section>
    </>
  );
}
