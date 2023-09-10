/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
        serverActions: true
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
