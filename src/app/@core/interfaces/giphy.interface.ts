export interface GiphyInterface {
  data: {
    id: string;
    images: {
      downsized_medium: {
        width: string;
        height: string;
        url: string;
      }
    }
  };
}

