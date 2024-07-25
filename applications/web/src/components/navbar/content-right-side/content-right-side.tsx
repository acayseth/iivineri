'use client'

import { type FC } from 'react'
import { FaGithub } from 'react-icons/fa'

import { NavbarContent, NavbarItem } from '@/components/next-ui/navbar/navbar'
import { Link } from '@/components/next-ui/link/link'
import { Image } from '@/components/next-ui/image/image'

interface IProps {}

const ContentRightSide: FC<Readonly<IProps>> = () => {
  return (
    <NavbarContent justify='end'>
      <NavbarItem>
        <Link
          href='https://github.com/acayseth/iivineri'
          rel='nofollow'
          target='_blank'
        >
          <FaGithub className='rounded-full w-8 h-8 text-black bg-white' />
        </Link>
      </NavbarItem>
    </NavbarContent>
  )
}

export { ContentRightSide }
