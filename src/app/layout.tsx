import 'server-only';

import clsx from 'clsx';
import React, { ReactNode, Suspense } from 'react';
import { Inter } from 'next/font/google';

import '@/app/globals.css';

import NavbarComponent from '@/components/ui/navbar/navbar.component';
import StandWithUkraineComponent from '@/components/ui/stand-with-ukraine/stand-with-ukraine.component';
import Ga4Component from '@/components/ui/ga4/ga4.component';

const inter = Inter({ subsets: ['latin'] });

interface IRootLayout {
  children: ReactNode;
}

export default function RootLayout({ children }: IRootLayout) {
  return (
    <html lang="ro">
      <body className={clsx(inter.className, 'bg-neutral-900')}>
        <NavbarComponent />
        <StandWithUkraineComponent />
        <Suspense>
          <main className="px-6 mx-auto max-w-screen-md pt-24">
            {children}
          </main>
        </Suspense>
        {process.env.NEXT_PUBLIC_GA_ID && <Ga4Component GA4_ID={process.env.NEXT_PUBLIC_GA_ID as string} />}
      </body>
    </html>
  );
}
