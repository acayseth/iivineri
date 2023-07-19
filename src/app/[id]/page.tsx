import 'server-only';

import { userHelperHook } from '@/_libs/servers/helper.hook';
import HomeComponent from '@/components/pages/home.component';
import { Metadata } from 'next';

export function generateMetadata({ params: { id } }: { params: { id: string } }): Promise<Metadata> {
  const { metadata } = userHelperHook();
  return metadata(id);
}

export default async function ({ params: { id } }: { params: { id: string } }) {
  const { fetchGiphy } = userHelperHook();
  const giphy = await fetchGiphy(id);
  
  return (
    <HomeComponent giphy={giphy} />
  );
}
