import type { NextConfig } from "next";

// Static export for Cloudflare Pages. Security headers live in public/_headers
// (Next static export does not support the next.config headers() hook).
const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
