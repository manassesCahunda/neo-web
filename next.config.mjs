/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    URL_SERVER: process.env.URL_SERVER,
    WEB: process.env.WEB,
    JWT_SECRET: process.env.JWT_SECRET,
    WEB_SOCKET: process.env.WEB_SOCKET
  },
}

export default nextConfig
