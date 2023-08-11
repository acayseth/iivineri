'use client';

import { useHelperHook } from '@/_libs/clients/helper.hook';
import { IGiphy } from '@/types/interfaces/giphy';
import clsx from 'clsx';

interface IProps {
  giphy: IGiphy;
}

export default function HomeComponent({ giphy }: IProps) {
  const { copy2Clipboard, refreshPage } = useHelperHook();
  
  return (
    <section>
      <div className="relative flex flex-col rounded-xl bordertransition-all shadown-sm shadow-gray-400/10 bg-neutral-800/90 bg-clip-border text-gray-700 shadow-md">
        <div className="relative m-4 h-[300px] md:h-[400px] object-scale-down overflow-hidden rounded-xl">
          <img
            className="absolute z-10 object-contain w-full h-full cursor-pointer"
            onClick={refreshPage}
            src={giphy?.data?.images?.downsized_large.url}
            width={1024}
            onLoadStart={() => 'loading..'}
            loading="lazy"
            alt=""
          />
          <div className="w-full z-0 h-full absolute flex flex-col justify-center items-center">
            <svg className="animate-spin -ml-1 mr-3 h-20 w-20 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="sr-only">loading</span>
          </div>
        </div>
        <div className="p-4 flex flex-row justify-between items-center">
          <button
            aria-label="compie link"
            className={clsx(
              'select-none rounded-md bg-white hover:bg-gray-100/80 w-1/2 py-3 px-6 text-center align-middle font-sans text-sm font-bold text-black transition-all',
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
              'select-none rounded-md bg-white hover:bg-gray-100/80 w-1/2 py-3 px-6 text-center align-middle font-sans text-sm font-bold text-black transition-all',
              'focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none',
            )}
            type="button"
            onClick={refreshPage}
          >
            Altă gif-că
          </button>
        </div>
      </div>
    </section>
  );
}
