/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ["@repo/ui"],
  images : {
    formats : []
  }
};

//Removing Strict Mode preventing Screen to rendering Twice
const nextConfig = {
  reactStrictMode: false
}

module.exports = nextConfig
