import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@photo-sphere-viewer/core",
    "@photo-sphere-viewer/markers-plugin",
  ],
};

export default nextConfig;
