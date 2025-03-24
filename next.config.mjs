/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'seiflawfirm.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    // Updated from serverComponentsExternalPackages to serverExternalPackages
    serverExternalPackages: ['mysql2'],
  },
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;

