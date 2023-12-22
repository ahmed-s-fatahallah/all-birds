/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.allbirds.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "cdn.dynamicyield.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "www.allbirds.com",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
