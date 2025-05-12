import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/:path*', // Applies to all routes
        headers: [
          {
            key: 'Set-Cookie',
            value: '__vercel_live_token=; Path=/; SameSite=None; Secure', // Fixes cookie warnings
          },
        ],
      },
    ];
  },
};

export default nextConfig;