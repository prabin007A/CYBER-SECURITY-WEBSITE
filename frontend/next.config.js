/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_BACKEND_URL: process.env.REACT_APP_BACKEND_URL,
    NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.REACT_APP_GA_MEASUREMENT_ID,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  allowedDevOrigins: ["*.preview.emergentagent.com"],
};

module.exports = nextConfig;
