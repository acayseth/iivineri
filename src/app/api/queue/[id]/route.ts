import { type NextRequest, NextResponse } from "next/server";
import moment from "moment";

module MRandom {
  export interface IRequestParams {
    params: {
      id: string
    };
  }
}

export async function GET(request: NextRequest, {params}: MRandom.IRequestParams) {
  try {
    const r = await fetch(`https://api.giphy.com/v1/gifs/${params.id}?${decodeURIComponent(new URLSearchParams({
      api_key: process.env.GIPHY_API_KEY as string,
      rating: process.env.GIPHY_RATING as string,
      tag: (moment().day() === 5 ? process.env.GIPHY_TAG_IS_FRIDAY as string : process.env.GIPHY_TAG_IS_NOT_FRIDAY as string),
    }).toString())}`, {cache: "no-store"});


    return NextResponse.json(await r.json());
  } catch (error) {
    return NextResponse.json({
      error: "Internal Error",
    }, {
      status: 500,
    });
  }
}