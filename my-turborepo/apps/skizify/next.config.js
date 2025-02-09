/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  transpilePackages: ["@repo/ui"],
  images: {
    formats: [],
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

  // 🔹 Added fixes for the "No Output Directory" issue:
  output: "export", // Enables static export
  distDir: "out", // Ensures Next.js exports to 'out'
  trailingSlash: true, // Optional: Adds trailing slashes to URLs for better static export support
};

module.exports = nextConfig;
