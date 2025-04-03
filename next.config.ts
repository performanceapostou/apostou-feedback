import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Ativa o modo estrito do React
  compiler: {
    styledComponents: true, // Habilita o suporte ao styled-components no SWC
  },
};

export default nextConfig;