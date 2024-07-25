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

const HomePage: FC<Readonly<IProps>> = () => {
  const t = useTranslations('default')

  return (
    <Card isBlurred className='px-6 py-4 mx-auto' shadow='md'>
      <CardHeader>card-header: {t('example')}</CardHeader>
      <CardBody>card-body</CardBody>
      <CardFooter>card-footer</CardFooter>
    </Card>
  )
}

export { HomePage }
