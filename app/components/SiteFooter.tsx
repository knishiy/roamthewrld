import { LINKS, NAV_ITEMS } from '../lib/site'
import { RoamMark } from './icons'

export default function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-white/10 px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2 text-white">
          <RoamMark size={20} />
          <span className="font-semibold">roamthewrld</span>
          <span className="text-sm text-muted">· Open-source neural band</span>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
            {NAV_ITEMS.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} className="hover:text-white">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="text-sm text-muted">
          © {year} Roam · Built by{' '}
          <a href={LINKS.portfolio} target="_blank" rel="noopener noreferrer" className="text-white underline-offset-4 hover:underline">
            Kenneth Nishiyama
          </a>
        </p>
      </div>
    </footer>
  )
}
