'use client'

// The actual three.js scene. Only ever loaded through <ModelStage>, which code-splits it,
// gates it on WebGL support and wraps it in an error boundary.
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { ContactShadows, Environment, Lightformer, OrbitControls } from '@react-three/drei'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js'
import { useEffect, useMemo, useRef, Suspense } from 'react'
import * as THREE from 'three'

export const MODEL_URL = '/models/Neural_band_mockup.stl'

export type CameraPreset = [number, number, number]

/**
 * Normalise the raw SolidWorks STL (millimetres, origin at a corner) once:
 * centre it and scale it to a unit bounding sphere so camera presets are size-independent.
 * useLoader caches the geometry by URL and shares it between canvases, so this must be idempotent.
 */
const prepared = new WeakSet<THREE.BufferGeometry>()
function prepare(geometry: THREE.BufferGeometry) {
  if (prepared.has(geometry)) return geometry
  geometry.center()
  geometry.computeBoundingSphere()
  const r = geometry.boundingSphere?.radius || 1
  geometry.scale(1 / r, 1 / r, 1 / r)
  geometry.computeVertexNormals()
  geometry.computeBoundingSphere()
  prepared.add(geometry)
  return geometry
}

function BandModel({ autoRotate, onReady }: { autoRotate: boolean; onReady?: () => void }) {
  const raw = useLoader(STLLoader, MODEL_URL)
  const geometry = useMemo(() => prepare(raw), [raw])
  const group = useRef<THREE.Group>(null)

  useEffect(() => {
    onReady?.()
  }, [onReady])

  useFrame((_, delta) => {
    if (autoRotate && group.current) group.current.rotation.y += delta * 0.25
  })

  return (
    // The ring's axis is the STL's Z axis; tilt it so the band reads as a 3/4 view.
    <group ref={group} rotation={[0, 0.9, 0]}>
      <mesh geometry={geometry} rotation={[-0.35, 0, 0]}>
        <meshPhysicalMaterial
          color="#2a3142"
          metalness={0.65}
          roughness={0.32}
          clearcoat={0.5}
          clearcoatRoughness={0.25}
          envMapIntensity={1.1}
        />
      </mesh>
    </group>
  )
}

/**
 * Eases the camera to a new preset whenever the preset changes, then lets go so it never
 * fights the user's own orbiting.
 */
function CameraRig({ position }: { position: CameraPreset }) {
  const { camera } = useThree()
  const target = useMemo(() => new THREE.Vector3(...position), [position])
  const animating = useRef(true)
  useEffect(() => {
    animating.current = true
  }, [target])
  useFrame((_, delta) => {
    if (!animating.current) return
    camera.position.lerp(target, 1 - Math.exp(-delta * 3))
    camera.lookAt(0, 0, 0)
    if (camera.position.distanceToSquared(target) < 1e-4) animating.current = false
  })
  return null
}

export interface NeuralBandViewerProps {
  camera?: CameraPreset
  accent?: string
  autoRotate?: boolean
  /** When false the render loop is paused (e.g. the canvas is scrolled off-screen). */
  active?: boolean
  interactive?: boolean
  onReady?: () => void
}

export default function NeuralBandViewer({
  camera = [0, 0.35, 3.3],
  accent = '#4d8dff',
  autoRotate = true,
  active = true,
  interactive = true,
  onReady,
}: NeuralBandViewerProps) {
  return (
    <Canvas
      // No shadow maps: ContactShadows below gives the grounding without the extra passes
      // (and avoids three r183's PCFSoftShadowMap deprecation warning on every frame).
      dpr={[1, 1.75]}
      frameloop={active ? 'always' : 'never'}
      camera={{ position: camera, fov: 40, near: 0.1, far: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent', touchAction: 'pan-y' }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 5, 3]} intensity={1.4} />
      <directionalLight position={[-4, -2, -3]} intensity={0.6} color={accent} />

      <Suspense fallback={null}>
        <BandModel autoRotate={autoRotate} onReady={onReady} />
        <ContactShadows position={[0, -1.05, 0]} opacity={0.45} scale={4} blur={2.6} far={2} />
      </Suspense>

      {/* Environment built from local light panels: no network fetch. The previous
          preset="city" pulled an HDR from raw.githack.com, which now returns 403, so the
          model's Suspense boundary never resolved and only the loading spinner showed. */}
      <Environment resolution={128} frames={1}>
        <Lightformer intensity={2} position={[0, 3, 2]} scale={[6, 1.5, 1]} />
        <Lightformer intensity={1.2} position={[-4, 0, 1]} rotation-y={Math.PI / 2} scale={[4, 2, 1]} />
        <Lightformer intensity={1.5} color={accent} position={[4, -1, -1]} rotation-y={-Math.PI / 2} scale={[4, 2, 1]} />
      </Environment>

      <CameraRig position={camera} />

      {interactive && (
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.6}
          minPolarAngle={Math.PI / 5}
          maxPolarAngle={Math.PI / 1.6}
        />
      )}
    </Canvas>
  )
}
