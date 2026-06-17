/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
  },

  // Exclude Sanity Studio from static generation
  experimental: {
    serverComponentsExternalPackages: ['@react-pdf/renderer'],
  },

  // Prevent studio from being statically analyzed
  typescript: {
    // Studio has its own type checking
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
