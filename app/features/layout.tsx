import type { Metadata } from 'next'

// Legacy pages from the earlier smart-bracelet concept (BAC sensing, proximity compass, ...).
// They are no longer linked from the site, so keep them out of search results until the
// owner decides whether to delete them.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function FeaturesLayout({ children }: { children: React.ReactNode }) {
  return children
}
