import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Project images are local SVG/PNG/JPG files in /public/projects.
    dangerouslyAllowSVG: false,
  },
};

export default nextConfig;
