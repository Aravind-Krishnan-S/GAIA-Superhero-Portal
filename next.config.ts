import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: {
    // @ts-ignore - Ignore type error for newer Next.js config options
    appIsrStatus: false,
    buildActivity: false,
  } as any,
  /* config options here */
};

export default nextConfig;
