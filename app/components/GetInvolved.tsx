import Reveal from './Reveal'
import { LINKS } from '../lib/site'
import { IconExternal } from './icons'

// Real, working destinations only (the old "Get Involved" and T/L/G buttons had no targets).
const CHANNELS = [
  { label: 'Follow the build', sub: 'kennethnishiyama.com', href: LINKS.portfolio },
  { label: 'Connect on LinkedIn', sub: 'Kenneth Nishiyama', href: LINKS.linkedin },
  { label: 'GitHub', sub: 'github.com/knishiy', href: LINKS.github },
]

export default function GetInvolved() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="px-4 py-24 sm:px-6 md:py-32">
      <Reveal className="relative isolate mx-auto max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-accent/[0.12] to-transparent px-6 py-14 text-center sm:px-12 sm:py-20">
        <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs text-amber-300">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" aria-hidden="true" />
          Currently in prototype development
        </p>
        <h2 id="contact-title" className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-5xl">
          Join the build
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted">
          Roam is open source. Whether you&apos;re a hardware hacker, ML engineer, or someone who needs better device
          control—there&apos;s a place for you. Contribute or follow our progress.
        </p>
        <ul className="mx-auto mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
          {CHANNELS.map((c) => (
            <li key={c.href}>
              <a
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col items-center gap-1 rounded-2xl border border-white/10 bg-background/60 px-4 py-4 transition hover:border-white/25 hover:bg-white/[0.04]"
              >
                <span className="inline-flex items-center gap-1.5 font-medium text-white">
                  {c.label}
                  <IconExternal size={14} className="opacity-50 transition group-hover:opacity-100" />
                </span>
                <span className="text-xs text-muted">{c.sub}</span>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
