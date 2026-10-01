import type { MetadataRoute } from 'next'
import { SITE_URL } from './lib/site'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    // /features/* is kept crawlable on purpose so search engines can see its noindex tag.
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
