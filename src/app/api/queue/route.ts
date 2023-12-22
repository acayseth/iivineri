import { type NextRequest, NextResponse } from "next/server";

import type { IGiphy } from "@/types/interfaces/giphy";
import moment from "moment";

module MApiRandom {
  export interface IData {
    id?: string;
  }

  export interface IGiphyExtended extends Omit<IGiphy, "data"> {
    data: IGiphy[];
    pagination: {
      total_count: number;
      count: number;
      offset: number;
    };
  }
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function GET(request: NextRequest) {
  try {
    const params = decodeURIComponent(new URLSearchParams({
      api_key: process.env.GIPHY_API_KEY as string,
      rating: process.env.GIPHY_RATING as string,
      q: (moment().day() === 5 ? process.env.GIPHY_TAG_IS_FRIDAY as string : process.env.GIPHY_TAG_IS_NOT_FRIDAY as string),
      limit: "25",
      lang: "ro",
      offset: `${getRandomInt(0, 1881)}`,
      bundle: "messaging_non_clips",
    }).toString());

    let response = await fetch(`https://api.giphy.com/v1/gifs/search?${params}`, {cache: "no-store"});

    if (!response.ok) {
      return NextResponse.json({error: "Forbidden"}, {status: 403});
    }

    const giphys = await response.json() as MApiRandom.IGiphyExtended;
    const randomLimit = getRandomInt(0, 24);

    return NextResponse.json({
      data: giphys.data[randomLimit],
      meta: giphys.meta,
    });
  } catch (error) {
    return NextResponse.json({
      error: "Internal Error",
    }, {
      status: 500,
    });
  }
}