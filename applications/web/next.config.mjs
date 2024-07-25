import fs from 'fs'

import createNextIntlPlugin from 'next-intl/plugin'
import createPWA from '@ducanh2912/next-pwa'

const withNextIntl = createNextIntlPlugin()
const withNextPwa = createPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  cacheOnFrontEndNav: false,
  aggressiveFrontEndNavCaching: false,
  cacheStartUrl: false,
})

const createI18nJsonFile = async () =>
  await fetch(
    `https://api.i18nexus.com/project_resources/languages.json?api_key=${process.env.I18NEXUS_API_KEY}`,
    {
      next: { revalidate: false },
    },
  )

const fn = async (_, { defaultConfig }) => {
  // createI18nJsonFile()
  //   .then(r => r.json())
  //   .then(async r => {
  //     const i18nJson = { locales: [], defaultLocale: '' }
  //     r.collection.forEach(v => {
  //       i18nJson.locales.push(v.language_code)
  //       if (v.base_language) {
  //         i18nJson.defaultLocale = v.language_code
  //       }
  //     })
  //
  //     fs.writeFileSync(`./i18n.json`, JSON.stringify(i18nJson))
  //   })

  /** @type {import('next').NextConfig} */
  const nextConfig = {
    ...defaultConfig,
    experimental: {
      taint: true,
    },
    generateEtags: true,
    swcMinify: true,
    output: 'standalone',
    logging: {
      fetches: {
        fullUrl: process.env.NODE_ENV === 'development',
      },
    },
    images: {
      loader: 'custom',
      loaderFile: './thumbor-loader.js',
    },
    generateBuildId: () => new Date().toISOString(),
    compiler:
      process.env.NODE_ENV === 'development'
        ? undefined
        : {
            removeConsole: {
              exclude: ['error'],
            },
          },
  }

  return withNextPwa(withNextIntl(nextConfig))
}

export default fn
