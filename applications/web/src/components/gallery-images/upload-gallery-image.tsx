'use client'

import React, { type FC } from 'react'

// import type { OnDelete, OnLoad } from '@/hooks/uloader/uploader.hook'
import type { IImage } from '@/@types/interfaces/image'
import { GalleryImage } from '@/components/gallery-images/_base/gallery-image'

interface UploadGalleryImageProps {
  image: IImage
}

const UploadGalleryImage: FC<Readonly<UploadGalleryImageProps>> = ({ image }) => {
  return (
    <GalleryImage image={image} />
  )
}

export {
  UploadGalleryImage,
  type UploadGalleryImageProps,
}