import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@workshop/interfaces"],
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
