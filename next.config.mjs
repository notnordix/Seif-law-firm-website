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
  // Remove the unsupported experimental option
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;

