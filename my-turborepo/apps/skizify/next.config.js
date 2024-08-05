/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ["@repo/ui"],
};

//Removing Strict Mode preventing Screen to rendering Twice
const nextConfig = {
  reactStrictMode: false
}

module.exports = nextConfig
