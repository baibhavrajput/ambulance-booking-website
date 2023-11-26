/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: 'build',
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['randomuser.me'],
  },
};

module.exports = nextConfig;
