/** @type {import('next').NextConfig} */
const nextConfig = {
  generateEtags: true,
  swcMinify: true,
  poweredByHeader: false,
  output: "standalone",
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'radio.hellnet.eu'
    }],
  },
};

module.exports = nextConfig;
