import 'server-only';

import HomeComponent from '@/components/pages/home.component';
import { userHelperHook } from '@/_libs/servers/helper.hook';
import { Metadata } from 'next';

export function generateMetadata(): Promise<Metadata> {
  const { metadata } = userHelperHook();
  return metadata();
}

export default async function () {
  const { fetchGiphy } = userHelperHook();
  const giphy = await fetchGiphy();
  
  return <HomeComponent giphy={giphy} />;
}
