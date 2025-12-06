import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/docs/:path*",
        destination: process.env.NODE_ENV === 'development'
          ? `${process.env.DOCS_URL || 'http://127.0.0.1:3001'}/docs/:path*` // Local development proxy
          : "/docs/:path*", // In production, we assume static files are serviced or handled by Vercel
      },
    ];
  },
};

export default nextConfig;
