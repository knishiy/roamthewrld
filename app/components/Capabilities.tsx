'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useRef, useState, type KeyboardEvent } from 'react'
import ModelStage from './ModelStage'
import SectionHeading from './SectionHeading'
import type { CameraPreset } from './NeuralBandViewer'
import {
  IconBolt, IconChart, IconChip, IconDevice, IconGauge, IconLoop, IconShield, IconSpark, IconTarget, IconVibrate, IconWave,
} from './icons'

type Capability = {
  id: string
  tab: string
  summary: string
  title: string
  accent: string
  camera: CameraPreset
  Icon: typeof IconWave
  points: { title: string; body: string; Icon: typeof IconWave }[]
}

// One shared viewer replaces the four separate WebGL canvases the old page mounted; each
// capability keeps its own camera angle and accent colour, as in the original design.
const CAPABILITIES: Capability[] = [
  {
    id: 'neural-device-control',
    tab: 'Neural Device Control',
    summary: 'Translate muscle signals into precise device commands',
    title: 'Control devices with your body',
    accent: '#4d8dff',
    camera: [0, 0.35, 3.3],
    Icon: IconWave,
    points: [
      {
        title: 'EMG Signal Translation',
        body: 'Electromyography sensors capture the electrical activity in your muscles and translate micro-contractions into precise digital commands for connected devices.',
        Icon: IconWave,
      },
      {
        title: 'Universal Device Control',
        body: 'Drones, robotic arms, industrial tools, surgical instruments—any Bluetooth-enabled device can be mapped to your muscle signals for hands-free operation.',
        Icon: IconDevice,
      },
      {
        title: 'Low-Latency Response',
        body: 'Sub-millisecond signal processing ensures your intent becomes action instantly—critical in high-stress, time-sensitive environments.',
        Icon: IconBolt,
      },
    ],
  },
  {
    id: 'adaptive-dampening',
    tab: 'Adaptive Dampening',
    summary: 'Stress-aware control adjustment to prevent errors',
    title: 'Stress-aware control adjustment',
    accent: '#22c55e',
    camera: [2.3, 1.1, 2.2],
    Icon: IconTarget,
    points: [
      {
        title: 'Real-Time Fatigue Detection',
        body: 'The band continuously monitors muscle fatigue and stress biomarkers through EMG and heart rate variability, detecting when your performance may be compromised.',
        Icon: IconGauge,
      },
      {
        title: 'Adaptive Control Dampening',
        body: 'When stress or nervousness is detected, the band automatically adjusts control sensitivity—dampening inputs to prevent overcorrection and costly mistakes.',
        Icon: IconTarget,
      },
      {
        title: 'Safety Envelope',
        body: "Configurable safety boundaries prevent extreme actions when the system detects you're operating outside your normal physiological range.",
        Icon: IconShield,
      },
    ],
  },
  {
    id: 'ai-pattern-learning',
    tab: 'AI Pattern Learning',
    summary: 'ML models that learn your unique physiological patterns',
    title: 'AI that learns you',
    accent: '#a855f7',
    camera: [0, 2.9, 1.5],
    Icon: IconSpark,
    points: [
      {
        title: 'Personal Pattern Recognition',
        body: 'ML models train on your unique EMG signatures, heart rate patterns, and muscle responses—building a profile that gets more accurate over time.',
        Icon: IconSpark,
      },
      {
        title: 'On-Device Processing Option',
        body: "Choose to run AI inference on your phone or computer's hardware instead of cloud APIs. Your data stays local, and your costs stay low.",
        Icon: IconChip,
      },
      {
        title: 'Continuous Adaptation',
        body: "The AI continuously refines its model as your patterns evolve—whether you're recovering from injury, building strength, or adapting to new equipment.",
        Icon: IconLoop,
      },
    ],
  },
  {
    id: 'habit-breaking',
    tab: 'Habit Breaking',
    summary: 'Muscle tracking to identify and correct unwanted habits',
    title: 'Break the pattern',
    accent: '#f59e0b',
    camera: [-2.2, 0.6, 2.4],
    Icon: IconVibrate,
    points: [
      {
        title: 'Habit Detection',
        body: 'The same EMG and muscle tracking sensors that enable device control can identify repetitive unwanted movements and behavioral patterns.',
        Icon: IconWave,
      },
      {
        title: 'Real-Time Intervention',
        body: 'Gentle haptic feedback alerts you the moment a habit pattern is detected, creating awareness before the action completes.',
        Icon: IconVibrate,
      },
      {
        title: 'Progress Tracking',
        body: 'Track your habit frequency over time. The AI learns which interventions work best for you and adapts its approach accordingly.',
        Icon: IconChart,
      },
    ],
  },
]

export default function Capabilities() {
  const [index, setIndex] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const current = CAPABILITIES[index]

  // WAI-ARIA tabs keyboard pattern: arrows move between tabs, Home/End jump to the ends.
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const last = CAPABILITIES.length - 1
    let next = index
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = index === last ? 0 : index + 1
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = index === 0 ? last : index - 1
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = last
    else return
    e.preventDefault()
    setIndex(next)
    tabs.current[next]?.focus()
  }

  return (
    <section id="features" aria-labelledby="features-title" className="relative px-4 py-24 sm:px-6 md:py-32">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-full bg-gradient-to-b from-surface/60 via-surface/30 to-transparent" />
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="features-title"
          eyebrow="Capabilities"
          title="What the band is being built to do"
          intro="Dive deep into each capability and discover how Roam gives you an edge in high-stress environments."
        />

        <div
          role="tablist"
          aria-label="Roam capabilities"
          aria-orientation="horizontal"
          onKeyDown={onKeyDown}
          className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4"
        >
          {CAPABILITIES.map((c, i) => {
            const selected = i === index
            return (
              <button
                key={c.id}
                ref={(el) => {
                  tabs.current[i] = el
                }}
                id={`tab-${c.id}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`panel-${c.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setIndex(i)}
                className={`group rounded-2xl border p-4 text-left transition-colors sm:p-5 ${
                  selected ? 'bg-white/[0.06]' : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
                }`}
                style={selected ? { borderColor: `${c.accent}80` } : undefined}
              >
                <span
                  className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg"
                  style={{ color: c.accent, backgroundColor: `${c.accent}1a` }}
                >
                  <c.Icon size={18} />
                </span>
                <span className="block text-sm font-semibold text-white sm:text-base">{c.tab}</span>
                <span className="mt-1 hidden text-sm leading-snug text-muted sm:block">{c.summary}</span>
              </button>
            )
          })}
        </div>

        <div className="mt-8 grid items-center gap-8 lg:mt-12 lg:grid-cols-2 lg:gap-12">
          <div
            id={`panel-${current.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${current.id}`}
            tabIndex={0}
            className="min-h-[22rem] rounded-2xl"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <h3 className="mb-8 text-2xl font-semibold sm:text-3xl" style={{ color: current.accent }}>
                  {current.title}
                </h3>
                <ul className="space-y-6">
                  {current.points.map(({ title, body, Icon }) => (
                    <li key={title} className="flex gap-4">
                      <span
                        className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] ring-1 ring-white/10"
                        style={{ color: current.accent }}
                      >
                        <Icon size={18} />
                      </span>
                      <div>
                        <h4 className="mb-1 font-semibold text-white">{title}</h4>
                        <p className="leading-relaxed text-muted">{body}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent">
            <div
              aria-hidden="true"
              className="absolute inset-0 transition-[background] duration-700"
              style={{ background: `radial-gradient(60% 60% at 50% 55%, ${current.accent}22, transparent 70%)` }}
            />
            <ModelStage camera={current.camera} accent={current.accent} autoRotate={false} />
          </div>
        </div>
      </div>
    </section>
  )
}
