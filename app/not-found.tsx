import type { Metadata } from 'next'
import Link from 'next/link'
import { RoamMark } from './components/icons'

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false },
}

export default function NotFound() {
  return (
    <main id="main" className="flex min-h-svh flex-col items-center justify-center px-4 text-center">
      <RoamMark size={40} className="mb-6 text-white" />
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">404</p>
      <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">This page wandered off.</h1>
      <p className="mt-4 max-w-md text-muted">The link may be outdated. Everything about the Roam neural band lives on the home page.</p>
      <Link href="/" className="mt-8 rounded-full bg-accent px-6 py-3 font-medium text-white transition hover:bg-[#6aa0ff]">
        Back to Roam
      </Link>
    </main>
  )
}
