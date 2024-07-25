import 'server-only'

import { HomePageComponent } from '@/components/pages/home/home-page.component'
import type { MPage } from '@/@types/modules/page'

export default async function Home({}: Readonly<MPage.IProps>) {
  return <HomePageComponent />
}
