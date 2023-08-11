import 'server-only';

import clsx from 'clsx';
import { Metadata } from 'next';
import React, { Suspense } from 'react';
import { Inter } from 'next/font/google';

import Ga4Component from '@/components/ga4/ga4.component';
import NavbarComponent from '@/components/navbar/navbar.component';
import { userHelperHook } from '@/_libs/servers/helper.hook';
import type { IRootLayout } from '@/types/interfaces/root-layout';

import '@/app/globals.css';

const inter = Inter({ subsets: ['latin'] });

export function generateMetadata(): Promise<Metadata> {
  const { metadata } = userHelperHook();
  return metadata();
}

export default function RootLayout({ children }: IRootLayout) {
  return (
    <html lang="ro">
      <body className={clsx(inter.className, 'bg-neutral-900')}>
        <NavbarComponent />
        <Suspense>
          <main className="px-6 mx-auto max-w-screen-md lg:pt-7 2xl:pt-8 pb-6 lg:pb-7 2xl:pb-8">
            {children}
          </main>
        </Suspense>
        {process.env.NEXT_PUBLIC_GA_ID && <Ga4Component GA4_ID={process.env.NEXT_PUBLIC_GA_ID as string} />}
      </body>
    </html>
  );
}
