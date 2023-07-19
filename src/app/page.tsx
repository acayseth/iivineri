import 'server-only';

import { type Metadata } from 'next';
import HomeComponent from '@/components/pages/home.component';
import { userHelperHook } from '@/_libs/servers/helper.hook';

export function generateMetadata(): Promise<Metadata> {
  const { metadata } = userHelperHook();
  return metadata();
}

export default async function () {
  const { fetchGiphy } = userHelperHook();
  const giphy = await fetchGiphy();
  
  return (
    <HomeComponent giphy={giphy} />
  );
}
