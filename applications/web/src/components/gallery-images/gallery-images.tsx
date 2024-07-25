'use client'

import { type FC, type ReactNode } from 'react'

import type { IImage } from '@/@types/interfaces/image'

interface IChildrenProps {
  image: IImage
}

type IChildren = ({ image }: IChildrenProps) => ReactNode

interface IProps {
  children: IChildren
  images: IImage[]
}

const GalleryImages: FC<Readonly<IProps>> = ({ children, images }) => {
  return (
    <ul className="grid grid-cols-1 lg:grid-cols-2 content-stretch gap-4 mb-4 mx-4">
      {images.map((image, index) => (
        <li key={index} className="flex justify-center items-center">
          {children({ image })}
        </li>
      ))}
    </ul>
  )
}

export { GalleryImages }
