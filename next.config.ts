import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "private-avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
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
  async redirects() {
    return [
      {
        source: "/",
        destination: "/docs/intro",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
