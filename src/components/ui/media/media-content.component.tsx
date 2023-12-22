'use client';

import React from 'react';

import type { IGiphy } from '@/types/interfaces/giphy';

interface IProps {
  giphy: IGiphy;
  type: 'mp4' | 'image';
}

export default function MediaContentComponent({ giphy, type }: IProps) {
  if (type === 'image') {
    return (<></>);
  }

  if (type === 'mp4') {
    return (
      <div>
      <video
        className="absolute z-10 object-contain w-full h-full cursor-pointer"
        width={giphy?.data?.images?.original_mp4?.width || giphy?.data?.images?.original.width}
        height={giphy?.data?.images?.original_mp4?.height || giphy?.data?.images?.original.height}
        controls={false}
        loop={true}
        playsInline={true}
        muted={true}
        autoPlay={true}
        disablePictureInPicture={true}
        disableRemotePlayback={true}
      >
        <source src={giphy?.data?.images?.original_mp4?.mp4 || giphy?.data?.images?.original.mp4} type="video/mp4" />
        Your browser does not support the video tag
      </video>
      <div className="w-full z-0 h-full absolute flex flex-col justify-center items-center">
        <svg className="animate-spin -ml-1 mr-3 h-20 w-20 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span className="sr-only">loading</span>
      </div>
    </div>
    );
  }
  
  return (<></>);
}
