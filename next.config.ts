import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/locales/request.locale.ts')

const nextConfig: NextConfig = {
  output: 'standalone'
}

export default withNextIntl(nextConfig)
