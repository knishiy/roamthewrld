import Image from 'next/image'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const MILESTONES = [
  {
    title: '16 Iterations to Perfection',
    body: "The path to the perfect prototype wasn't straightforward. It took 16 different iterations, each one teaching us something new about form, function, and sensor placement. Every prototype brought us closer to the ideal balance of comfort, wearability, and signal fidelity.",
    points: ['Form factor optimization', 'Sensor placement refinement', 'Adjusting fits around wrist', 'Minimal size optimization'],
    image: '/images/optimized/iterations.webp',
    alt: 'A table covered in 3D-printed band prototypes from successive design iterations',
    color: '#4d8dff',
  },
  {
    title: 'The First Working Prototype',
    body: "This was the moment everything came together. The first working band that proved our concept was possible. It wasn't perfect, but it was real—a tangible proof that a neural control band could become reality.",
    points: ['All sensors functional', 'EMG signal capture validated', 'Data optimization using AI', 'Proof of concept validated'],
    image: '/images/optimized/first-prototype.webp',
    alt: 'The first working band prototype, a blue 3D-printed ring',
    color: '#22c55e',
  },
  {
    title: 'Sensor Calibration & Testing',
    body: 'Extensive testing of various sensor configurations to understand signal quality, noise isolation, and optimal electrode placement. This phase was crucial for validating our approach and gathering training data for the AI models.',
    points: ['EMG signal quality benchmarking', 'Sensor calibration and validation', 'Data collection for AI training', 'Noise isolation and filtering'],
    image: '/images/optimized/sensor-testing.webp',
    alt: 'Breadboard test rig with sensor wiring and a small display used for calibration',
    color: '#f97316',
  },
]

export default function Journey() {
  return (
    <section id="history" aria-labelledby="history-title" className="px-4 py-24 sm:px-6 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="history-title"
          eyebrow="Journey"
          title="From concept to prototype"
          intro="From concept to reality—explore the evolution of Roam through our development milestones."
        />

        <ol className="space-y-16 md:space-y-24">
          {MILESTONES.map((m, i) => (
            <li key={m.title}>
              <Reveal>
                <div className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
                  <div className={i % 2 === 1 ? 'md:order-2' : ''}>
                    <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em]" style={{ color: m.color }}>
                      Milestone {String(i + 1).padStart(2, '0')}
                    </p>
                    <h3 className="mb-5 text-2xl font-semibold text-white sm:text-3xl">{m.title}</h3>
                    <p className="mb-6 leading-relaxed text-muted">{m.body}</p>
                    <ul className="grid gap-2 sm:grid-cols-2">
                      {m.points.map((p) => (
                        <li key={p} className="flex items-center gap-3 text-[15px] text-foreground/85">
                          <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: m.color }} />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <figure className={`mx-auto w-full max-w-sm ${i % 2 === 1 ? 'md:order-1' : ''}`}>
                    <div className="overflow-hidden rounded-3xl border border-white/10 bg-surface p-2">
                      <Image
                        src={m.image}
                        alt={m.alt}
                        width={1050}
                        height={1400}
                        sizes="(min-width: 768px) 384px, 90vw"
                        className="aspect-[4/5] h-auto w-full rounded-2xl object-cover"
                      />
                    </div>
                  </figure>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
