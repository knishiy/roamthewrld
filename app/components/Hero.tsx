import ModelStage from './ModelStage'
import { IconArrowRight } from './icons'

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate overflow-hidden pt-16">
      {/* Static backdrop (the old JS parallax re-rendered the page on every scroll and slid
          a hard-edged gradient block down over the next section). */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div className="absolute -top-40 right-[-10%] h-[38rem] w-[38rem] rounded-full bg-accent/20 blur-[120px]" />
        <div className="absolute bottom-0 left-[-15%] h-[28rem] w-[28rem] rounded-full bg-indigo-600/10 blur-[120px]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
      </div>

      <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-6xl items-center gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:py-16">
        <div className="text-center lg:text-left">
          <p className="animate-rise mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" aria-hidden="true" />
            Open source · Prototype in development
          </p>
          <h1 id="hero-title" className="animate-rise text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl" style={{ animationDelay: '80ms' }}>
            <span className="block text-white">Roam</span>
            <span className="block bg-gradient-to-r from-[#6aa0ff] to-[#4d8dff] bg-clip-text text-transparent">Neural Band</span>
          </h1>
          <p
            className="animate-rise mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted sm:text-xl lg:mx-0"
            style={{ animationDelay: '160ms' }}
          >
            An open-source neural interface that reads your body, learns your patterns, and gives you precise control over any
            device—even under pressure.
          </p>
          <div
            className="animate-rise mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start"
            style={{ animationDelay: '240ms' }}
          >
            <a
              href="#about"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-white shadow-lg shadow-accent/20 transition hover:bg-[#6aa0ff]"
            >
              Explore the band
              <IconArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#research"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 font-medium text-white transition hover:border-white/30 hover:bg-white/5"
            >
              Research foundation
            </a>
          </div>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[22rem] sm:max-w-md lg:max-w-none">
          <div aria-hidden="true" className="absolute inset-[12%] rounded-full border border-white/[0.06]" />
          <div aria-hidden="true" className="absolute inset-[24%] rounded-full border border-white/[0.04]" />
          <ModelStage priority showHint />
        </div>
      </div>
    </section>
  )
}
