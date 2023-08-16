'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import iiVineriLogo from '@/../public/icons/iivineri.png';
import githubLogo from '@/../public/icons/github.svg';

export default function NavbarComponent() {
  return (
    <nav className="flex items-center justify-between fixed w-screen bg-black shadow-2xl h-16 z-40">
      <div className="flex-1 flex justify-center mr-auto"> </div>
      <div className="mx-12 px-12 relative">
        <Link href="/" className="">
          <Image src={iiVineriLogo.src} width={95} height={24} alt="Îi vineri?" />
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
  );
}
