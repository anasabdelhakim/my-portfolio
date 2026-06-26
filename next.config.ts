import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },

  // ─── Compress responses with gzip/br ───
  compress: true,

  // ─── Image optimization ───
  images: {
    formats: ['image/avif', 'image/webp'],
    // Prevent over-fetching — match actual render sizes in the app
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes:  [16, 32, 48, 64, 96, 128, 256],
    // Minimize external origin requests — cache at CDN edge longer
    minimumCacheTTL: 86400,
    remotePatterns: [
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },

  experimental: {
    // ─── Tree-shake heavy packages to emit only imported symbols ───
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      '@radix-ui/react-icons',
      'tailwind-merge',
      'clsx',
    ],
    // ─── Inline critical CSS into the HTML shell (eliminates render-blocking CSS request) ───
    inlineCss: true,
  },
};

export default nextConfig;