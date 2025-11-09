import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
  reactCompiler: true,
	experimental: {
		turbopackFileSystemCacheForDev: true,
	},
  // add host name
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "brimalval-public-site-assets.s3.ap-southeast-1.amazonaws.com",
      }
    ]
  }
};

export default nextConfig;
