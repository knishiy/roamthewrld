import type { NextConfig } from 'next'
import path from 'node:path'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    // Static export has no image optimizer; images are pre-optimised to WebP in public/images/optimized.
    unoptimized: true,
  },
  // A stray package-lock.json in the user's home directory made Next guess the wrong workspace root.
  outputFileTracingRoot: path.join(__dirname),
  turbopack: { root: path.join(__dirname) },
}

export default nextConfig
