import 'server-only';

import { userHelperHook } from '@/_libs/servers/helper.hook';
import HomeComponent from '@/components/pages/home.component';

export default async function ({ params: { id } }: { params: { id: string } }) {
  const { fetchGiphy } = userHelperHook();
  const giphy = await fetchGiphy(id);
  
  return (
    <HomeComponent giphy={giphy} />
  );
}
