import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // CMS media (Supabase storage / backend uploads) and YouTube thumbnails
    // come from runtime-configured hosts, so allow any remote host.
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
};

export default nextConfig;
