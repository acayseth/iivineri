import 'server-only';

import { userHelperHook } from '@/_libs/servers/helper.hook';
import HomeComponent from '@/components/pages/home.component';
import { Metadata } from 'next';

export function generateMetadata(): Promise<Metadata> {
  const { metadata } = userHelperHook();
  return metadata();
}

export default async function ({ params: { id } }: { params: { id: string } }) {
  const { fetchGiphy } = userHelperHook();
  const giphy = await fetchGiphy(id);
  
  return <HomeComponent giphy={giphy} />;
}
