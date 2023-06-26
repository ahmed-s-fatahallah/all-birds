/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.allbirds.com",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
