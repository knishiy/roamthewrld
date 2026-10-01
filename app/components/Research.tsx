import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { LINKS } from '../lib/site'
import { IconExternal, IconFile, IconGauge, IconLoop, IconShield, IconVibrate, IconWave } from './icons'

// Facts here are limited to the public research summary. Keep it that way: no participant
// data, unpublished numbers or lab-internal details.
const LOOP = [
  {
    step: '01',
    title: 'Sense',
    body: 'Wireless forearm EMG (Delsys Trigno) streams muscle activity in real time.',
    Icon: IconWave,
  },
  {
    step: '02',
    title: 'Estimate',
    body: 'An extended Kalman filter fuses a physiological fatigue model with EMG median-frequency drift to estimate fatigue as it builds.',
    Icon: IconGauge,
  },
  {
    step: '03',
    title: 'Gate',
    body: 'An amplitude/spectrum gate is applied to the EMG signal within the loop.',
    Icon: IconShield,
  },
  {
    step: '04',
    title: 'Adapt',
    body: 'Force feedback on a Phantom Omni haptic device adapts to the estimated fatigue, closing the loop.',
    Icon: IconVibrate,
  },
  {
    step: '05',
    title: 'Personalize',
    body: 'Offline Bayesian optimization personalizes the loop to each user.',
    Icon: IconLoop,
  },
]

const CARRIES_OVER = [
  {
    title: 'Signal processing',
    body: 'Treating forearm EMG as a spectrum, not just an amplitude: median-frequency drift is a fatigue cue, and an amplitude/spectrum gate belongs in the pipeline from the start.',
  },
  {
    title: 'Fatigue estimation',
    body: "Roam's Adaptive Dampening needs a fatigue signal it can trust. Fusing a physiological model with EMG features, instead of trusting either alone, is the approach the band is designed around.",
  },
  {
    title: 'Haptic feedback',
    body: 'Closing the loop through the body: the same idea behind adapting feedback to fatigue shapes how Roam plans to cue the wearer, as in Habit Breaking.',
  },
]

export default function Research() {
  return (
    <section id="research" aria-labelledby="research-title" className="relative px-4 py-24 sm:px-6 md:py-32">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-surface/50 to-transparent" />
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="research-title"
          eyebrow="Research foundation"
          title="Built on closed-loop EMG research"
          intro={
            <>
              Kenneth Nishiyama, Roam&apos;s creator, was a Visiting Researcher at <span className="text-white">Miura Lab, Institute of Science Tokyo</span>{' '}
              (Mar–Aug 2026), where he built closed-loop EMG fatigue-adaptive haptics: a system that estimates forearm muscle
              fatigue in real time and adapts force feedback to it. That work shapes how Roam approaches signal processing,
              fatigue estimation and feedback.
            </>
          }
        />

        <Reveal>
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {LOOP.map(({ step, title, body, Icon }) => (
              <li key={step} className="relative rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <div className="mb-4 flex items-center justify-between">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent ring-1 ring-accent/25">
                    <Icon size={18} />
                  </span>
                  <span className="font-mono text-xs text-white/30">{step}</span>
                </div>
                <h3 className="mb-2 font-semibold text-white">{title}</h3>
                <p className="text-sm leading-relaxed text-muted">{body}</p>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal className="mt-4">
          <div className="flex flex-col gap-2 rounded-2xl border border-accent/25 bg-accent/[0.06] p-5 sm:flex-row sm:items-center sm:gap-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Pilot result</p>
            <p className="text-foreground/90">
              The closed loop was validated, and fatigue-model error fell by about <span className="font-semibold text-white">8×</span> against
              dynamometer ground truth.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_2fr]">
          <Reveal>
            <h3 className="text-2xl font-semibold text-white">What carries over to Roam</h3>
            <p className="mt-3 leading-relaxed text-muted">
              The ideas, not the equipment. The lab setup used research-grade EMG and a desktop haptic device; Roam is a
              separate wearable built around its own dry electrodes.
            </p>
          </Reveal>
          <ul className="grid gap-4 sm:grid-cols-3">
            {CARRIES_OVER.map((c, i) => (
              <Reveal as="li" key={c.title} delay={i * 0.06}>
                <div className="h-full rounded-2xl border border-white/10 p-5">
                  <h4 className="mb-2 font-semibold text-white">{c.title}</h4>
                  <p className="text-sm leading-relaxed text-muted">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal className="mt-12">
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={LINKS.researchSummary}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 font-medium text-black transition hover:bg-white/90"
            >
              <IconFile size={18} />
              Read the public research summary (PDF)
            </a>
            <a
              href={LINKS.research}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-3 font-medium text-white transition hover:border-white/30 hover:bg-white/5"
            >
              Research on kennethnishiyama.com
              <IconExternal size={16} />
            </a>
          </div>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-white/40">
            Roam is an independent open-source project. It does not use Miura Lab code or hardware, and it is not endorsed
            by Miura Lab or the Institute of Science Tokyo. Details beyond the public summary are not shared here.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
