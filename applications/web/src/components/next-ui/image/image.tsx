'use client'

import { type FC, type ReactNode } from 'react'

import { default as NextImage, ImageProps as NextImageProps } from 'next/image'
import { Image as NextUiImage, ImageProps as NexUiImageProps } from '@nextui-org/image'
import { cn } from '@/libs/cn/cn.lib'

interface IProps
  extends Omit<
    NexUiImageProps,
    'src' | 'as' | 'alt' | 'width' | 'height' | 'srcSet'
  >,
    Omit<
      NextImageProps,
      'src' | 'as' | 'alt' | 'width' | 'height' | 'onError'
    > {
  src: string
  alt: string
  width: number
  height: number
  useNextImage?: true
  className?: string
}

const Image: FC<Readonly<IProps>> = ({
                                       children,
                                       src,
                                       width,
                                       height,
                                       useNextImage,
                                       className,
                                       ...props
                                     }) => {
  return (
    <NextUiImage
      src={src}
      width={width}
      height={height}
      as={useNextImage ? NextImage : 'img'}
      className={cn(className)}
      {...props}
    />
  )
}

export { Image }
