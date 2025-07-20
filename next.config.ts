import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    localPatterns: [
      {
        pathname: '/assets/images/**',
        search: '**',
      },
    ],
  }
};

export default nextConfig;
