'use client'

import { type FC } from 'react'
import { MdDeleteForever } from 'react-icons/md'

import type { IImage } from '@/@types/interfaces/image'
import { cn } from '@/libs/cn/cn.lib'
import { Image } from '@/components/next-ui/image/image'
import { Button } from '@/components/next-ui/button/button'
import { CircularProgress } from '@/components/next-ui/progress/circular-progress'

interface IProps {
  image: IImage
}

const GalleryImage: FC<Readonly<IProps>> = ({ image }) => {
  const onLoad = () => {
    if (image.onLoad) {
      image.onLoad(image.src)
    }

    return undefined
  }

  const Loading = () => (
    <div className="absolute w-full h-full flex items-center justify-center z-10">
      <CircularProgress
        aria-label="Loading..."
        size="lg"
        value={20}
        color="warning"
        className="bg-background/85 rounded-full border-2 border-content4 shadow-sm"
        showValueLabel={true}
      />
    </div>
  )

  return (
    <div className="group">
      <div className={cn(
        'relative aspect-square w-[340px] h-[340px]',
        'transition-all duration-200 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]',
      )}>
        <Image
          className="w-[340px] h-[340px] object-none"
          src={image.src}
          isBlurred
          radius="sm"
          shadow="sm"
          width={340}
          height={340}
          alt={image.alt}
          classNames={{
            wrapper: 'absolute',
          }}
          onLoad={onLoad}
        />
        <div className={cn(
          'absolute inset-0 w-[340px] h-[340px] rounded-lg bg-black/50 text-center text-slate-200',
          '[backface-visibility:hidden] [transform:rotateY(180deg)] z-10',
        )}>
          <div className="absolute grid grid-flow-col w-full bottom-0">
            <Button
              isIconOnly
              fullWidth
              className="w-full"
              radius="lg"
              color="danger"
            >
              <MdDeleteForever className="mr-2 h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export { GalleryImage }
