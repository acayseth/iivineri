import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'

import i18nJson from '@/../i18n.json'

// const getTranslationDevelopmentMode = async (locale: string): Promise<any> => {
//   const url: string = `https://api.i18nexus.com/project_resources/translations/${locale}.json?api_key=${process.env.I18NEXUS_API_KEY}`
//   const init: RequestInit = { next: { revalidate: false } }
//
//   return await fetch(url).then(r => r.json())
// }
//
// const getTranslationProductionMode = async (locale: string): Promise<any> => {
//   return (await import(`../messages/${locale}.json`)).default
// }

export default getRequestConfig(async ({ locale }) => {
  if (!i18nJson.locales.includes(locale)) {
    notFound()
  }

  const msg = (await import(`../messages/${locale}.json`)).default

  return {
    // messages: await getTranslationDevelopmentMode(locale),
    messages: msg,
  }
})
