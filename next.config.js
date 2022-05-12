/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['image.tmdb.org'],
        layoutRaw: true,
    },
}

module.exports = nextConfig
