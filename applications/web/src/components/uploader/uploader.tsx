'use client'

import React, { type FC } from 'react'

import { useUploaderHook } from '@/hooks/uloader/uploader.hook'
import { cn } from '@/libs/cn/cn.lib'
import { DragZoneAction } from '@/components/uploader/dragzone-action'
import { GalleryImages } from '@/components/gallery-images/gallery-images'
import { GalleryImage } from '@/components/gallery-images/_base/gallery-image'

export interface IProps {
  className?: string;
}

const Uploader: FC<Readonly<IProps>> = ({ className }) => {
  const {
    getRootProps, getInputProps, images,
    isDragAccept, isDragActive, isDragReject,
  } = useUploaderHook()

  return (
    <div className={cn('w-full border border-content4 rounded-lg bg-background', className)}>
      <div
        className={cn(
          'border-2 border-content4 border-dashed rounded-lg bg-background flex',
          'justify-center items-center m-4 cursor-pointer',
        )}
        {...getRootProps()}
      >
        <label>
          <input {...getInputProps()} />
        </label>
        <DragZoneAction
          isDragAccept={isDragAccept}
          isDragActive={isDragActive}
          isDragReject={isDragReject}
          count={images.length}
          maxFiles={10}
        />
      </div>

      <div className="mb-4 mx-4">
        <GalleryImages images={images}>
          {({ image }) => <GalleryImage image={image} />}
        </GalleryImages>
      </div>
    </div>
  )
}

export {
  Uploader,
}
