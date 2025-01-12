import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://blog_api:5000/api/:path*',
      },
    ];
  },
};

export default nextConfig;
