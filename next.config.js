/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true
    },
    output: 'standalone',
    images: {
        domains: ['radio.hellnet.eu']
    }
}

module.exports = nextConfig
