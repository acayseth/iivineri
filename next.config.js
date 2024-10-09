/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true
    },
    generateEtags: true,
    swcMinify: true,
    poweredByHeader: false,
    output: 'standalone',
    images: {
        domains: ['radio.hellnet.eu']
    }
}

module.exports = nextConfig
