import Image from 'next/image'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const MEASURES = [
  'Surface EMG from forearm muscles—detecting finger and hand gestures',
  'Muscle tension levels for real-time fatigue and stress detection',
  'Electrical signal patterns unique to each user for personalized AI training',
  'Continuous muscle contraction data for adaptive control dampening',
  'On-device signal filtering and BLE streaming via nRF52840',
]

export default function Hardware() {
  return (
    <section id="hardware" aria-labelledby="hardware-title" className="px-4 py-24 sm:px-6 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading id="hardware-title" eyebrow="Hardware" title="Dry electrode EMG sensing" />

        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal className="lg:order-2">
            <figure className="overflow-hidden rounded-3xl border border-white/10 bg-surface">
              <Image
                src="/images/optimized/dry-electrode-band.webp"
                alt="The chain-link Roam band prototype worn on three wrists making different hand gestures"
                width={1067}
                height={756}
                sizes="(min-width: 1024px) 560px, 100vw"
                className="h-auto w-full"
              />
              <figcaption className="border-t border-white/10 px-5 py-3 text-sm text-muted">
                Chain-link prototype: one solid dry electrode per link.
              </figcaption>
            </figure>
          </Reveal>

          <Reveal className="lg:order-1">
            <div className="space-y-5 text-base leading-relaxed text-muted sm:text-lg">
              <p>
                Each link in the band contains a solid dry electrode that conforms to your wrist shape—no gels, no prep, no
                consumables. The chain-link design ensures consistent skin contact as you move, adapting to your unique
                anatomy for reliable signal capture.
              </p>
              <p>
                These electrodes measure electrical signals from hand gestures, wrist movements, and muscle contractions. The
                array captures both surface EMG for gesture recognition and deeper muscle tension for fatigue monitoring,
                amplified by an LMP91000 analog front-end and streamed via the Seeed XIAO nRF52840 over Bluetooth.
              </p>
            </div>

            <h3 className="mb-4 mt-10 text-lg font-semibold text-white">What the electrodes measure</h3>
            <ul className="space-y-3">
              {MEASURES.map((m) => (
                <li key={m} className="flex gap-3 text-[15px] leading-relaxed text-foreground/85">
                  <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                  {m}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
