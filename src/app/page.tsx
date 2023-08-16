import 'server-only';

import type { Metadata } from 'next';

import { userHelperHook } from '@/_libs/servers/helper.hook';
import HomeComponent from '@/components/pages/home/home.component';

export function generateMetadata(): Promise<Metadata> {
  const { metadata } = userHelperHook();
  
  return metadata({ robots: true });
}

export default async function () {
  const { fetchGiphy } = userHelperHook();
  const giphy = await fetchGiphy({});
  
  return <HomeComponent giphy={giphy} />;
}
