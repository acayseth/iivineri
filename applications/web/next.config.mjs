import createPWA from '@ducanh2912/next-pwa'

const withNextPwa = createPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  cacheOnFrontEndNav: false,
  aggressiveFrontEndNavCaching: false,
  cacheStartUrl: false,
})


const fn = async (_, { defaultConfig }) => {
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

  return withNextPwa(nextConfig)
}

export default fn
