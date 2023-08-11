import 'server-only';

import HomeComponent from '@/components/pages/home.component';
import { userHelperHook } from '@/_libs/servers/helper.hook';

export default async function () {
  const { fetchGiphy } = userHelperHook();
  const giphy = await fetchGiphy();
  
  return (
    <HomeComponent giphy={giphy} />
  );
}
