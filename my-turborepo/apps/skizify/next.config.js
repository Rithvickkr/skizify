/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/ui"],
  images: {
    formats: [],
    domains: ['images.unsplash.com', 'www.gravatar.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.example.com',
        port: '',
        pathname: '/account123/**',
      },
    ],
  },
  reactStrictMode: false, // Disable strict mode to prevent double rendering
};

module.exports = nextConfig;
