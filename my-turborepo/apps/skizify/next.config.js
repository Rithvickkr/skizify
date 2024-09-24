/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ["@repo/ui"],
  images : {
    formats : [],
    domains: ['images.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.example.com',
        port: '',
        pathname: '/account123/**',
      },
    ],
  }
};

//Removing Strict Mode preventing Screen to rendering Twice
const nextConfig = {
  reactStrictMode: false
}

module.exports = nextConfig
