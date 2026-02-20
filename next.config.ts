import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'content.homenetiol.com',
      },
    ],
  },
};

export default nextConfig;
