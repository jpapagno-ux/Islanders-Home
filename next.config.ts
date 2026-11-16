import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/homes", destination: "/properties", permanent: false },
      { source: "/homes/:path*", destination: "/properties", permanent: false },
      { source: "/collections", destination: "/properties/collection", permanent: false },
      { source: "/collections/:path*", destination: "/properties/collection", permanent: false },
      { source: "/journal", destination: "/island-intelligence", permanent: false },
      { source: "/journal/:path*", destination: "/island-intelligence", permanent: false },
      { source: "/contact", destination: "/inquire", permanent: false },
    ];
  },
};

export default nextConfig;
