/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['image.tmdb.org'],
        layoutRaw: true,
    },
    output: 'export',
}

module.exports = nextConfig
