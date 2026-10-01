import Reveal from './Reveal'

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  id,
}: {
  eyebrow: string
  title: React.ReactNode
  intro?: React.ReactNode
  align?: 'left' | 'center'
  id?: string
}) {
  const centered = align === 'center'
  return (
    <Reveal className={`mb-12 md:mb-16 ${centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}`}>
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
      <h2 id={id} className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {intro && <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">{intro}</p>}
    </Reveal>
  )
}
