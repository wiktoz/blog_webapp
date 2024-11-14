import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  async rewrites() {
    return [
      {
        source: '/api/:path*', // Matches any request starting with /api/
        destination: 'http://localhost:5000/api/:path*', // Proxies to Flask server
      },
    ];
  },
};

export default nextConfig;
