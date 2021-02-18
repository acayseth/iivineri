export interface IGif {
  id: string;
  url: string;
  width: string;
  height: string;
}

export interface IGiphy {
  data: IGiphyData;
}

interface IGiphyData {
  id: string;
  images: IGiphyImage;
}

interface IGiphyImage {
  downsized_medium: IGiphyImageParameters;
}

interface IGiphyImageParameters {
  width: string;
  height: string;
  url: string;
}


