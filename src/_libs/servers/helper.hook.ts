import "server-only";

import type { Metadata } from "next";
import moment from "moment/moment";

// @ts-ignore
import logo from "@/../public/icons/iivineri.png";

import { EDaysOfWeek } from "@/types/enums/days-of-week";
import type { IGiphy } from "@/types/interfaces/giphy";

interface IMetadataProps {
  robots: boolean;
  id?: string;
}

interface IFetchGiphyProps {
  id?: string;
}

export function userHelperHook() {

  const fetchGiphy = async ({id = "random"}: IFetchGiphyProps): Promise<IGiphy> => {
    let response: any;
    if (id === "random") {
      function getRandomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);

        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      const params = decodeURIComponent(new URLSearchParams({
        api_key: process.env.GIPHY_API_KEY as string,
        rating: process.env.GIPHY_RATING as string,
        q: (moment().day() === 5 ? process.env.GIPHY_TAG_IS_FRIDAY as string : process.env.GIPHY_TAG_IS_NOT_FRIDAY as string),
        limit: "5",
        lang: "ro",
        offset: `${getRandomInt(0, 1881)}`,
        bundle: "messaging_non_clips",
      }).toString());

      response = await fetch(`https://api.giphy.com/v1/gifs/search?${params}`, {cache: "no-store"});
      response = await response.json();

      response = {
        data: response.data[getRandomInt(0, 4)],
        meta: response.meta,
      }

      return response;
    } else {
      response = await fetch(`https://api.giphy.com/v1/gifs/${id}?${decodeURIComponent(new URLSearchParams({
        api_key: process.env.GIPHY_API_KEY as string,
        rating: process.env.GIPHY_RATING as string,
        tag: (moment().day() === 5 ? process.env.GIPHY_TAG_IS_FRIDAY as string : process.env.GIPHY_TAG_IS_NOT_FRIDAY as string),
      }).toString())}`, {cache: "no-store"});
      return await response.json();
    }
  };

  const metadata = async ({id, robots}: IMetadataProps): Promise<Metadata> => {
    const description: string = "Vinerea este în mod tradițional a cincea zi a săptămânii (pentru țările în care săptămâna începe lunea), care cade între zilele de joi și sâmbătă. Etimologie: Veneris dies (l.lat.) = Ziua zeiței Venus.";
    let giphy: IGiphy | undefined = undefined;
    let videos: any | null = null;

    if (id) {
      giphy = await fetchGiphy({id});
      videos = [
        {
          url: giphy?.data?.images?.original_mp4.mp4 || giphy?.data?.images?.original.mp4,
          type: "video/mp4",
          width: giphy?.data?.images?.original_mp4.width || giphy?.data?.images?.original.width,
          height: giphy?.data?.images?.original_mp4.height || giphy?.data?.images?.original.height,
        },
      ];
    }

    return {
      title: "Îi vineri?",
      description: EDaysOfWeek[moment().day()],
      applicationName: "Îi vineri?",
      themeColor: "black",
      colorScheme: "dark",
      creator: "MD Prodacșăn",
      robots: {follow: robots, index: robots},
      icons: logo.src,
      openGraph: {
        images: giphy?.data?.images?.downsized_large?.url || `${process.env.NEXT_PUBLIC_PROJECT_URL}${logo.src}`,
        url: giphy?.data?.images?.downsized_large?.url || `${process.env.NEXT_PUBLIC_PROJECT_URL}${logo.src}`,
        videos,
        description,
      },
      keywords: [
        "ii vineri", "iivineri", "vineri", "iivineri gif", "gif",
      ],
    };
  };

  return {
    metadata,
    fetchGiphy,
  };
}
