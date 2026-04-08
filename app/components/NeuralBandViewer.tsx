'use client'

import { Canvas, useLoader, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js'
import { useRef, Suspense, useEffect } from 'react'
import * as THREE from 'three'

interface BandModelProps {
  rotation?: [number, number, number]
  autoRotate?: boolean
  rotateSpeed?: number
}

function BandModel({ rotation, autoRotate = true, rotateSpeed = 0.3 }: BandModelProps) {
  const geometry = useLoader(STLLoader, '/models/Neural_band_mockup.stl')
  const meshRef = useRef<THREE.Mesh>(null)

  // Auto-rotate slowly
  useFrame((_, delta) => {
    if (meshRef.current && autoRotate) {
      meshRef.current.rotation.y += delta * rotateSpeed
    }
  })

  // Center the geometry
  geometry.center()
  geometry.computeVertexNormals()

  // Apply initial rotation
  useEffect(() => {
    if (meshRef.current && rotation) {
      meshRef.current.rotation.set(rotation[0], rotation[1], rotation[2])
    }
  }, [rotation])

  return (
    <mesh ref={meshRef} geometry={geometry} castShadow receiveShadow>
      <meshPhysicalMaterial
        color="#1a1a2e"
        metalness={0.8}
        roughness={0.2}
        clearcoat={0.4}
        clearcoatRoughness={0.2}
        envMapIntensity={1.2}
      />
    </mesh>
  )
}

function SmoothCamera({ position, target }: { position: [number, number, number]; target?: [number, number, number] }) {
  const { camera } = useThree()
  const targetVec = useRef(new THREE.Vector3(...(target || [0, 0, 0])))

  useFrame(() => {
    camera.position.lerp(new THREE.Vector3(...position), 0.02)
    camera.lookAt(targetVec.current)
  })

  return null
}

function LoadingSpinner() {
  return (
    <mesh>
      <ringGeometry args={[0.8, 1, 32]} />
      <meshBasicMaterial color="#3b82f6" wireframe />
    </mesh>
  )
}

interface NeuralBandViewerProps {
  cameraPosition?: [number, number, number]
  cameraTarget?: [number, number, number]
  modelRotation?: [number, number, number]
  autoRotate?: boolean
  rotateSpeed?: number
  className?: string
  accentColor?: string
}

export default function NeuralBandViewer({
  cameraPosition = [0, 0, 250],
  cameraTarget = [0, 0, 0],
  modelRotation,
  autoRotate = true,
  rotateSpeed = 0.3,
  className = '',
  accentColor = '#3b82f6',
}: NeuralBandViewerProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: cameraPosition, fov: 45 }}
        shadows
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} castShadow />
        <directionalLight position={[-10, -5, -5]} intensity={0.4} color={accentColor} />
        <spotLight position={[0, 10, 10]} intensity={0.6} angle={0.3} penumbra={1} color={accentColor} />

        <Suspense fallback={<LoadingSpinner />}>
          <BandModel rotation={modelRotation} autoRotate={autoRotate} rotateSpeed={rotateSpeed} />
          <Environment preset="city" />
          <ContactShadows position={[0, -50, 0]} opacity={0.3} scale={200} blur={2} />
          <SmoothCamera position={cameraPosition} target={cameraTarget} />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  )
}
