/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'admin.likostrade.ru',
                port: '',
                pathname: '/uploads/**',
            },
        ],
    }
}

module.exports = nextConfig
