export interface IGiphy {
  data: IGiphyData;
  meta: IGiphyMeta;
}

export interface IGiphyData {
  import_datetime: string;
  embed_url: string;
  trending_datetime: string;
  bitly_url: string;
  rating: string;
  is_sticker: number;
  source: string;
  type: string;
  bitly_gif_url: string;
  title: string;
  source_tld: string;
  url: string;
  source_post_url: string;
  content_url: string;
  id: string;
  slug: string;
  username: string;
  images: IGiphyDataImageLibrary;
  user: IGiphyDataUser;
  fixed_width_small_width: string;
  fixed_height_small_width: string;
  image_url: string;
  image_frames: string;
  image_mp4_url: string;
  fixed_width_downsampled_height: string;
  caption: string;
  fixed_height_downsampled_width: string;
  image_width: string;
  image_original_url: string;
  fixed_width_downsampled_url: string;
  fixed_width_downsampled_width: string;
  fixed_height_small_height: string;
  image_height: string;
  fixed_height_downsampled_url: string;
  fixed_height_downsampled_height: string;
  fixed_width_small_still_url: string;
  fixed_width_small_height: string;
  fixed_height_small_still_url: string;
  fixed_height_small_url: string;
  fixed_width_small_url: string;
}

export interface IGiphyDataImageLibrary {
  hd: IGiphyDataImageLibraryItem;
  downsized_large: IGiphyDataImageLibraryItem;
  fixed_height_small_still: IGiphyDataImageLibraryItem;
  original: IGiphyDataImageLibraryItem;
  fixed_height_downsampled: IGiphyDataImageLibraryItem;
  downsized_still: IGiphyDataImageLibraryItem;
  fixed_height_still: IGiphyDataImageLibraryItem;
  downsized_medium: IGiphyDataImageLibraryItem;
  downsized: IGiphyDataImageLibraryItem;
  preview_webp: IGiphyDataImageLibraryItem;
  original_mp4: IGiphyDataImageLibraryItem;
  fixed_height_small: IGiphyDataImageLibraryItem;
  fixed_height: IGiphyDataImageLibraryItem;
  downsized_small: IGiphyDataImageLibraryItem;
  preview: IGiphyDataImageLibraryItem;
  fixed_width_downsampled: IGiphyDataImageLibraryItem;
  fixed_width_small_still: IGiphyDataImageLibraryItem;
  fixed_width_small: IGiphyDataImageLibraryItem;
  original_still: IGiphyDataImageLibraryItem;
  fixed_width_still: IGiphyDataImageLibraryItem;
  looping: IGiphyDataImageLibraryItem;
  fixed_width: IGiphyDataImageLibraryItem;
  preview_gif: IGiphyDataImageLibraryItem;
  '480w_stillpreview_gif': IGiphyDataImageLibraryItem;
}

export interface IGiphyDataImageLibraryItem {
  width?: string;
  height?: string;
  url?: string;
  size?: string;
  mp4?: string;
  mp4_size?: string;
  webp?: string;
  webp_size?: string;
}


export interface IGiphyDataUser {
  avatar_url: string;
  website_url: string;
  instagram_url: string;
  profile_url: string;
  description: string;
  banner_url: string;
  banner_image: string;
  display_name: string;
  is_verified: boolean;
  username: string;
}

export interface IGiphyMeta {
  msg: string;
  response_id: string;
  status: number;
}

