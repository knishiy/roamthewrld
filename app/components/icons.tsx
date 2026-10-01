// Small inline stroke icons (replacing emoji, which render inconsistently across platforms
// and are announced verbatim by screen readers).
import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { size?: number }

function Base({ size = 20, children, ...rest }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  )
}

export const IconWave = (p: IconProps) => (
  <Base {...p}><path d="M2 12h3l2-6 4 12 3-9 2 3h6" /></Base>
)
export const IconGauge = (p: IconProps) => (
  <Base {...p}><path d="M12 14l4-4" /><path d="M3.3 17a9 9 0 1 1 17.4 0" /><circle cx="12" cy="14" r="1.2" /></Base>
)
export const IconSpark = (p: IconProps) => (
  <Base {...p}><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" /><circle cx="12" cy="12" r="3" /></Base>
)
export const IconUnlock = (p: IconProps) => (
  <Base {...p}><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 7.5-2" /></Base>
)
export const IconTarget = (p: IconProps) => (
  <Base {...p}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></Base>
)
export const IconLoop = (p: IconProps) => (
  <Base {...p}><path d="M4 12a8 8 0 0 1 13.7-5.6L20 9" /><path d="M20 4v5h-5" /><path d="M20 12a8 8 0 0 1-13.7 5.6L4 15" /><path d="M4 20v-5h5" /></Base>
)
export const IconVibrate = (p: IconProps) => (
  <Base {...p}><rect x="8" y="4" width="8" height="16" rx="2" /><path d="M4 8v8M20 8v8M1.5 10v4M22.5 10v4" /></Base>
)
export const IconChart = (p: IconProps) => (
  <Base {...p}><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></Base>
)
export const IconShield = (p: IconProps) => (
  <Base {...p}><path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z" /></Base>
)
export const IconChip = (p: IconProps) => (
  <Base {...p}><rect x="6" y="6" width="12" height="12" rx="2" /><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" /></Base>
)
export const IconDevice = (p: IconProps) => (
  <Base {...p}><rect x="3" y="5" width="18" height="12" rx="2" /><path d="M8 21h8M12 17v4" /></Base>
)
export const IconBolt = (p: IconProps) => (
  <Base {...p}><path d="M13 2L4 14h7l-1 8 9-12h-7z" /></Base>
)
export const IconArrowRight = (p: IconProps) => (
  <Base {...p}><path d="M5 12h14M13 6l6 6-6 6" /></Base>
)
export const IconExternal = (p: IconProps) => (
  <Base {...p}><path d="M14 4h6v6M20 4l-9 9" /><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></Base>
)
export const IconMenu = (p: IconProps) => (
  <Base {...p}><path d="M4 7h16M4 12h16M4 17h16" /></Base>
)
export const IconClose = (p: IconProps) => (
  <Base {...p}><path d="M6 6l12 12M18 6L6 18" /></Base>
)
export const IconFile = (p: IconProps) => (
  <Base {...p}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5M9 13h6M9 17h4" /></Base>
)

/** The Roam ring mark, used in the nav, footer and favicon. */
export function RoamMark({ size = 22, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <circle cx="16" cy="16" r="11" fill="none" stroke="currentColor" strokeWidth="4" />
      <circle cx="16" cy="5" r="2.6" fill="#4d8dff" />
    </svg>
  )
}
