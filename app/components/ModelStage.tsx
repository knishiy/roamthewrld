'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import { Component, useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import type { CameraPreset } from './NeuralBandViewer'

// three.js + R3F (~250 kB gz) is split out of the main bundle and only fetched on the client.
const NeuralBandViewer = dynamic(() => import('./NeuralBandViewer'), { ssr: false })

const POSTER = '/images/band-render.webp'

function hasWebGL(): boolean {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

/** Catches loader / WebGL-context errors that R3F re-throws into the React tree, which
 *  would otherwise unmount the whole page. */
class ViewerBoundary extends Component<{ fallback: ReactNode; onError: () => void; children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch(error: unknown) {
    console.warn('[Roam] 3D viewer unavailable, showing still render instead.', error)
    this.props.onError()
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

interface ModelStageProps {
  camera?: CameraPreset
  accent?: string
  autoRotate?: boolean
  priority?: boolean
  className?: string
  label?: string
  /** Show a "Drag to rotate" hint when the model is actually draggable. */
  showHint?: boolean
}

type Mode = 'pending' | 'webgl' | 'fallback'

export default function ModelStage({
  camera,
  accent,
  autoRotate = true,
  priority = false,
  className = '',
  label = '3D model of the Roam neural band',
  showHint = false,
}: ModelStageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [mode, setMode] = useState<Mode>('pending')
  const [nearViewport, setNearViewport] = useState(false)
  const [inView, setInView] = useState(false)
  const [ready, setReady] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  // On touch screens OrbitControls sets touch-action:none and swallows vertical swipes, trapping
  // page scroll inside the (large) hero canvas, so drag-to-rotate is desktop-only.
  const [coarsePointer, setCoarsePointer] = useState(false)

  useEffect(() => {
    setMode(hasWebGL() ? 'webgl' : 'fallback')
    setCoarsePointer(window.matchMedia('(pointer: coarse)').matches)
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const onChange = () => setReducedMotion(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // Mount the canvas only once it is close to the viewport, and pause its render loop
  // whenever it scrolls out of view.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const near = new IntersectionObserver(([e]) => e.isIntersecting && setNearViewport(true), { rootMargin: '400px 0px' })
    const visible = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0 })
    near.observe(el)
    visible.observe(el)
    return () => {
      near.disconnect()
      visible.disconnect()
    }
  }, [])

  const handleReady = useCallback(() => setReady(true), [])
  const handleError = useCallback(() => {
    setReady(false)
    setMode('fallback')
  }, [])
  const showCanvas = mode === 'webgl' && nearViewport

  const poster = (
    <Image
      src={POSTER}
      alt={mode === 'fallback' ? 'Still render of the Roam neural band (3D preview needs WebGL)' : ''}
      fill
      sizes="(min-width: 1024px) 50vw, 100vw"
      priority={priority}
      className={`object-contain transition-opacity duration-700 ${ready && mode === 'webgl' ? 'opacity-0' : 'opacity-100'}`}
    />
  )

  return (
    <div
      ref={ref}
      className={`relative h-full w-full ${className}`}
      role={mode === 'webgl' ? 'img' : undefined}
      aria-label={mode === 'webgl' ? label : undefined}
    >
      {/* Still render doubles as the loading state and the no-WebGL fallback. */}
      {poster}

      {showCanvas && (
        <ViewerBoundary fallback={null} onError={handleError}>
          <div className={`absolute inset-0 transition-opacity duration-700 ${ready ? 'opacity-100' : 'opacity-0'}`}>
            <NeuralBandViewer
              camera={camera}
              accent={accent}
              autoRotate={autoRotate && !reducedMotion}
              active={inView}
              interactive={!coarsePointer}
              onReady={handleReady}
            />
          </div>
        </ViewerBoundary>
      )}

      {showHint && ready && mode === 'webgl' && !coarsePointer && (
        <p className="pointer-events-none absolute inset-x-0 -bottom-1 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-white/30">
          Drag to rotate
        </p>
      )}

      {showCanvas && !ready && (
        <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center" aria-live="polite">
          <span className="flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1 text-xs text-muted backdrop-blur">
            <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/20 border-t-accent" />
            Loading 3D model
          </span>
        </div>
      )}
    </div>
  )
}
