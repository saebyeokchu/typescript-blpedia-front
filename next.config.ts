import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: { extend: {} },
  plugins: [],
};

export default nextConfig;
