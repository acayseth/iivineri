'use client'

import { type FC } from 'react'

import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from '@/components/next-ui/card/card'
import { useTranslations } from 'next-intl'

interface IProps {}

const HomePageComponent: FC<Readonly<IProps>> = () => {
  const t = useTranslations('default')

  return (
    <>
      home page
    </>
  )
}

export { HomePageComponent }
