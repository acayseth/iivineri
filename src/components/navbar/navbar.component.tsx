'use client';

import { useFriday } from '@/_libs/clients/friday.hook';
import clsx from 'clsx';
import Image from 'next/image';
import logo from '@/app/logo.svg';
import githubLogo from '@/app/github.svg';
import Link from 'next/link';
import React from 'react';
import Countdown from 'react-countdown';

const rendererCountDown = ({ days, hours, minutes, seconds }: any) => {
  return (
    <>
      <p className="font-serif font-bold text-white text-xl">
        <span className="text-2xl">Până vineri:</span>
        <span className="underline decoration-1">
          {days !== 0 && (days === 1
            ? <span className="px-0.5">O zi,</span>
            : <span className="px-0.5">{days} zile,</span>)}
          
          {(hours !== 0) && (hours === 1
              ? <span className="px-0.5">O oră,</span>
              : <span className="px-0.5">{hours} ore,</span>
          
          )}
          
          {minutes !== 0 && (minutes === 1
              ? <span className="px-0.5">o minută</span>
              : <span className="px-0.5">{minutes} minute</span>
          )}
          
          <span className="px-0.5">și {seconds} secunde</span>
        </span>
      </p>
    </>
  );
};

export default function NavbarComponent() {
  const { leftTime, loading, daysOfWeek, isFriday } = useFriday();
  
  return (
    <>
      <nav className="flex items-center justify-between fixed w-screen bg-black shadow-2xl h-16 z-40">
        <div className="flex-1 flex justify-center mr-auto">
        {/* left side */}
        </div>
        <div className="mx-12 px-12 relative">
          <Link href="/" className="">
            <Image src={logo} width={95} height={24} alt="Îi vineri?" />
            <span className="absolute -top-2 right-11 flex h-5 w-5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            </span>
          </Link>
        </div>
        <div className="flex-1 flex justify-center ml-auto">
          <Link href="https://github.com/acayseth/iivineri" target="_blank" className="px-2">
            <Image className="bg-gray-50 rounded-full p-0.5" src={githubLogo} width={30} height={30} alt="github" />
          </Link>
          <Link href="https://radio.hellnet.eu" target="_blank" className="px-2">
            <Image className="bg-gray-50 rounded-full p-0.5" src="https://radio.hellnet.eu/static/radio.hellnet.png" alt="radio.hellnet.eu" width={30} height={30} />
          </Link>
        </div>
      </nav>
      <header className="px-6 mx-auto max-w-screen-lg pt-16 pb-6 lg:pb-7 2xl:pb-8">
        <div className="mx-auto max-w-7xl text-center px-4 py-6 sm:px-6 lg:px-8 relative">
          <h1
            className={clsx(
              'text-5xl font-bold tracking-tight text-white mb-16 md:mb-5',
              { 'animate-pulse': isFriday },
            )}>
            {daysOfWeek}
          </h1>
          {(!loading && leftTime > 0) && <Countdown
              className="absolute left-0 right-0 bottom-0 -mt-14 mb-5"
              now={Date.now}
              date={Date.now() + (leftTime * 1000)}
              renderer={rendererCountDown}
          />}
        </div>
      </header>
    </>
  );
}
