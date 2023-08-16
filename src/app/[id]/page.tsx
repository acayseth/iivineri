import 'server-only';

import React from 'react';
import type { Metadata } from 'next';

import HomeComponent from '@/components/pages/home/home.component';
import { userHelperHook } from '@/_libs/servers/helper.hook';

interface IProps {
  params: {
    id: string
  };
}

export function generateMetadata({ params: { id } }: IProps): Promise<Metadata> {
  const { metadata } = userHelperHook();
  
  return metadata({ id, robots: false });
}

export default async function ({ params: { id } }: IProps) {
  const { fetchGiphy } = userHelperHook();
  const giphy = await fetchGiphy({ id });
  
  return <HomeComponent giphy={giphy} />;
}
