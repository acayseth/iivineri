import 'server-only';

import { Product, WithContext } from 'schema-dts'
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

  const jsonLd: WithContext<Product> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'random gif',
    image: giphy.data.images.downsized_large.mp4,
    description: 'random gif',
  }

  return (
    <>
      <HomeComponent giphy={giphy} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}/>
    </>
  );
}
