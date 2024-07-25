'use client'

import { type FC, useContext } from 'react'

import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@/components/next-ui/navbar/navbar'
import { Image } from '@/components/next-ui/image/image'
import { Link } from '@/components/next-ui/link/link'
import { cn } from '@/libs/cn/cn.lib'
import { AppContext } from '@/providers/app/app.context'

import whiteLogoImage from '@/../public/logo/white.png'
import blackLogoImage from '@/../public/logo/black.png'

interface IProps {}

const ContentCenterSide: FC<Readonly<IProps>> = () => {
  const { isFriday } = useContext(AppContext)

  return (
    <NavbarContent justify='center'>
      <NavbarBrand>
        <NavbarItem>
          <Link href='/'>
            <Image
              src={whiteLogoImage.src}
              alt='black-logo'
              className={cn('hidden dark:block', {
                'animate-bounce': isFriday,
              })}
              width={128}
              height={34}
            />
            <Image
              src={blackLogoImage.src}
              alt='white-logo'
              className={cn('dark:hidden', { 'animate-bounce': isFriday })}
              width={128}
              height={34}
            />
          </Link>
        </NavbarItem>
      </NavbarBrand>
    </NavbarContent>
  )
}

export { ContentCenterSide }
