'use client'

import { type FC, ReactNode } from 'react'
import { default as NextLink, LinkProps as NextLinkProps } from 'next/link'
import { Link as UiLink, LinkProps as UiProps } from '@nextui-org/link'

import { superGlueAbsoluteUrl } from '@/utils/helper/helper.util'

interface IProps
  extends Omit<NextLinkProps, 'children' | 'as'>,
    Omit<UiProps, 'as'> {
  children: ReactNode
  href: string
}

const Link: FC<Readonly<IProps>> = ({ children, href, locale, ...props }) => (
  <UiLink
    as={NextLink}
    locale={locale}
    href={superGlueAbsoluteUrl({ pathname: href })}
    {...props}
  >
    {children}
  </UiLink>
)

export { Link }
