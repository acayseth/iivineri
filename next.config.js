/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true
    },
    images: {
        domains: ['radio.hellnet.eu']
    }
}

module.exports = nextConfig
