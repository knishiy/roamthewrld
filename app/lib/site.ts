// Single source of truth for site-wide constants and outbound links.
export const SITE_URL = 'https://roamthewrld.com'
export const SITE_NAME = 'Roam'
export const SITE_TITLE = 'Roam — Open-Source Neural Band'
export const SITE_DESCRIPTION =
  'Roam is an open-source neural band that reads forearm muscle signals, learns your patterns and adapts to fatigue and stress, so you keep precise device control under pressure.'

export const LINKS = {
  portfolio: 'https://kennethnishiyama.com',
  research: 'https://kennethnishiyama.com/#research',
  researchSummary: 'https://kennethnishiyama.com/EMG%20Research%20Documentation.pdf',
  linkedin: 'https://www.linkedin.com/in/kenneth-nishiyama-a06601250',
  github: 'https://github.com/knishiy',
} as const

export const NAV_ITEMS = [
  { id: 'about', label: 'Overview' },
  { id: 'features', label: 'Capabilities' },
  { id: 'hardware', label: 'Hardware' },
  { id: 'research', label: 'Research' },
  { id: 'history', label: 'Journey' },
] as const
