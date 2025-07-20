import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: '/assets/images/**',
        search: '**',
      },
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'starwars-visualguide.com',
      },
    ],
  }
};

export default nextConfig;
