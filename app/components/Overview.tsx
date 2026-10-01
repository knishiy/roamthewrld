import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { IconSpark, IconUnlock, IconWave } from './icons'

const PILLARS = [
  {
    title: 'Neural Control',
    description:
      'EMG and electric signal sensing translates your muscle intent into precise device commands—no buttons, no screens, just you.',
    Icon: IconWave,
  },
  {
    title: 'Adaptive Intelligence',
    description:
      "AI/ML learns your specific patterns and adapts to fatigue and stress. When you're under pressure, the band dampens controls to prevent mistakes.",
    Icon: IconSpark,
  },
  {
    title: 'Open Source',
    description:
      'Fully open hardware and software. Configure sensor thresholds, control mappings, and AI models to fit your exact use case. Run AI on-device to minimize costs.',
    Icon: IconUnlock,
  },
]

export default function Overview() {
  return (
    <section id="about" aria-labelledby="about-title" className="px-4 py-24 sm:px-6 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="about-title"
          eyebrow="Overview"
          title="Your body. Your interface. Your control."
          intro="Roam is an open-source neural band that measures heart rate, muscle contractions, and electric signals—then uses AI to learn your unique patterns. It adapts to your stress and fatigue in real time, giving you reliable device control when it matters most. Built open, so every user can configure it to their needs."
        />

        <ul className="grid gap-5 md:grid-cols-3">
          {PILLARS.map(({ title, description, Icon }, i) => (
            <Reveal as="li" key={title} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-7 transition-colors hover:border-white/20">
                <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/25">
                  <Icon size={22} />
                </span>
                <h3 className="mb-3 text-xl font-semibold text-white">{title}</h3>
                <p className="leading-relaxed text-muted">{description}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
