import 'server-only';

import type { Metadata } from 'next';
import moment from 'moment/moment';
import logo from '@/app/logo.svg';

export function userHelperHook() {
  
  const fetchGiphy = (id: string = 'random') => {
    return fetch(`https://api.giphy.com/v1/gifs/${id}?${decodeURIComponent(new URLSearchParams({
      api_key: process.env.GIPHY_API_KEY as string,
      rating: process.env.GIPHY_RATING as string,
      tag: (moment().day() === 5 ? process.env.GIPHY_TAG_IS_FRIDAY as string : process.env.GIPHY_TAG_IS_NOT_FRIDAY as string),
    }).toString())}`, { cache: 'no-store' }).then(r => r.json());
  };
  
  const metadata = async (id?: string): Promise<Metadata> => {
    const giphy = await fetchGiphy(id);
    return {
      title: 'ii vineri? ',
      description: 'cănd ii vineri?',
      applicationName: 'ii vineri?',
      themeColor: 'black',
      colorScheme: 'dark',
      creator: 'MD Prodașăn',
      robots: { follow: true, index: true },
      openGraph: {
        images: [giphy?.downsized_large?.url || logo.src],
      },
      twitter: {
        images: [giphy?.downsized_large?.url || logo.src],
      },
    };
  };
  
  return { metadata, fetchGiphy };
}
