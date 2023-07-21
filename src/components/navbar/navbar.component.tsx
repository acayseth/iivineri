'use client';

import { useFriday } from '@/_libs/clients/friday.hook';
import Image from 'next/image';
import logo from '@/app/logo.svg';
import githubLogo from '@/app/github.svg';
import Link from 'next/link';
import React from 'react';
import Countdown from 'react-countdown';

const rendererCountDown = ({ days, hours, minutes, seconds }: any) => {
  return (
    <div className="absolute left-0 right-0 bottom-0 -mt-12 mb-5">
        <h2 className="font-serif font-bold text-white text-xl">
          Până vineri:
          {(days !== 0 && days === 1) && <span className="px-0.5">{days} zi</span>}
          {(days !== 0 && days > 1) && <span className="px-0.5">{days} zile</span>}
          {hours !== 0 && <span className="px-0.5">{hours} ore</span>}
          {minutes !== 0 && <span className="px-0.5">{minutes} minute</span>}
          <span className="px-0.5">{seconds} secunde</span>
        </h2>
      </div>
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
        <div className="mx-12">
          <Link href="/" className="relative">
            <Image src={logo} width={95} height={24} alt="iivineri" />
            <span
              className="inline-flex absolute top-1 right-1 items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium font-bold text-gray-600/40 ring-1 ring-inset ring-gray-500/10"
            >2.0</span>
          </Link>
        </div>
        <div className="flex-1 flex justify-center ml-auto">
          <Link href="https://github.com/acayseth/iivineri" target="_blank" className="px-2">
            <Image className="bg-gray-50 rounded-full -mt-2 p-0.5" src={githubLogo} width={24} height={24} alt="github" />
          </Link>
          
          <Link href="https://radio.hellnet.eu" target="_blank" className="px-2">
            <Image className="bg-gray-50 rounded-full -mt-2 p-0.5" src="https://radio.hellnet.eu/static/radio.hellnet.png" alt="radio.hellnet.eu" width={24} height={24} />
          </Link>
        </div>
      </nav>
      <header className="px-6 mx-auto max-w-screen-lg pt-16 pb-6 lg:pb-7 2xl:pb-8">
        <div className="mx-auto max-w-7xl text-center px-4 py-6 sm:px-6 lg:px-8 relative">
          <h1 className="text-3xl font-bold tracking-tight text-white mb-8">{daysOfWeek}</h1>
          {(!loading && !isFriday) && <Countdown
              now={Date.now}
              date={Date.now() + (leftTime * 1000)}
              renderer={rendererCountDown}
          />}
        </div>
      </header>
    </>
  );
}
