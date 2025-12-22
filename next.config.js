/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
    formats: ['image/webp'],
  },
  // App Router включен по умолчанию в Next.js 14, явное объявление experimental.appDir не требуется
};

module.exports = nextConfig;