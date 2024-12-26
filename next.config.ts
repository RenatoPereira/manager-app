import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

import cspHeader from '@/settings/csp.settings'

const withNextIntl = createNextIntlPlugin('./src/locales/request.locale.ts')

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
        port: '',
        pathname: '/**',
        search: ''
      }
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\n/g, '')
          }
        ]
      }
    ]
  }
}

export default withNextIntl(nextConfig)
