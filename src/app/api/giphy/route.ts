import axios from "@/http/axios.http";
import moment from "moment";

const CONST_API_KEY = process.env.GIPHY_API_KEY;
const CONST_GIPHY_RATING = process.env.GIPHY_RATING;
const CONST_TAG = moment().day() === 5 ? process.env.GIPHY_TAG_IS_FRIDAY : process.env.GIPHY_TAG_IS_NOT_FRIDAY;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id") || "random";

  try {
    const response = await axios({
      method: "GET",
      baseURL: "https://api.giphy.com",
      url: `/v1/gifs/${id}`,
      params: { api_key: CONST_API_KEY, rating: CONST_GIPHY_RATING, tag: CONST_TAG },
    });

    return Response.json(response);
  } catch (e) {
    return Response.json(
      {},
      {
        status: 500,
        statusText: "Internal error",
      }
    );
  }
}
