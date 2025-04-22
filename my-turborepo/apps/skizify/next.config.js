/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  transpilePackages: ["@repo/ui"],
  images: {
    formats: ["image/avif", "image/webp"],
    domains: [
      "images.unsplash.com",
      "www.gravatar.com",
      "skizify-bucket.s3.ap-south-1.amazonaws.com",
      "avatars.githubusercontent.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.example.com",
        port: "",
        pathname: "/account123/**",
      },
    ],
  },
  reactStrictMode: false, // Disable strict mode to prevent double rendering
  experimental: {
    outputFileTracing: true,
  },
};

module.exports = nextConfig;
