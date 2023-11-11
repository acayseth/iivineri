import 'server-only';

import type { Metadata } from 'next';
import moment from 'moment/moment';

import iiVineriLogo from '@/../public/icons/iivineri.png';

import { EDaysOfWeek } from '@/types/enums/days-of-week';
import type { IGiphy } from '@/types/interfaces/giphy';

interface IMetadataProps {
  robots: boolean;
  id?: string;
}

interface IFetchGiphyProps {
  id?: string;
}

export function userHelperHook() {

  const fetchGiphy = async ({ id = 'random' }: IFetchGiphyProps): Promise<IGiphy> => {
    const url = `${process.env.NEXT_PUBLIC_PROJECT_URL}?${decodeURIComponent(new URLSearchParams({ id }).toString())}`;
    return await fetch(url, { cache: 'no-store' }).then(r => r.json());
  };

  const metadata = async ({ id, robots }: IMetadataProps): Promise<Metadata> => {
    const description: string = 'Vinerea este în mod tradițional a cincea zi a săptămânii (pentru țările în care săptămâna începe lunea), care cade între zilele de joi și sâmbătă. Etimologie: Veneris dies (l.lat.) = Ziua zeiței Venus.';
    let giphy: IGiphy | undefined = undefined;
    let videos: any | null = null;

    if (id) {
      giphy = await fetchGiphy({ id });
      videos = [
        {
          url: giphy?.data?.images?.original_mp4.mp4,
          type: 'video/mp4',
          width: giphy?.data?.images?.original_mp4.width,
          height: giphy?.data?.images?.original_mp4.height,
        },
      ];
    }

    return {
      title: 'Îi vineri?',
      description: EDaysOfWeek[moment().day()],
      applicationName: 'Îi vineri?',
      creator: 'MD Prodacșăn',
      robots: { follow: robots, index: robots },
      icons: iiVineriLogo.src,
      openGraph: {
        images: giphy?.data?.images?.downsized_large?.url || `${process.env.NEXT_PUBLIC_PROJECT_URL}${iiVineriLogo.src}`,
        url: giphy?.data?.images?.downsized_large?.url || `${process.env.NEXT_PUBLIC_PROJECT_URL}${iiVineriLogo.src}`,
        videos,
        description,
      },
      twitter: {
        images: giphy?.data?.images?.downsized_large?.url || `${process.env.NEXT_PUBLIC_PROJECT_URL}${iiVineriLogo.src}`,
        description,
      },
      keywords: [
        'ii vineri', 'iivineri', 'vineri', 'iivineri gif', 'gif',
      ],
    };
  };

  return {
    metadata,
    fetchGiphy,
  };
}
