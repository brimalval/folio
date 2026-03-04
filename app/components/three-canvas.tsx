'use client'

import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'

function FloatingShape({ wireframeColor }: { wireframeColor: string }) {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh scale={1.2}>
        <torusKnotGeometry args={[1, 0.3, 128, 32, 2, 3]} />
        <MeshDistortMaterial
          color={wireframeColor}
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          wireframe={true}
        />
      </mesh>
    </Float>
  )
}

export default function ThreeCanvas() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [wireframeColor, setWireframeColor] = useState('#e0def4')

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    const updateColor = () => {
      const computedStyle = getComputedStyle(document.documentElement)
      const color = computedStyle.getPropertyValue('--wireframe').trim()
      setWireframeColor(color || '#e0def4')
    }

    updateColor()
    const observer = new MutationObserver(updateColor)
    observer.observe(document.documentElement, { attributes: true })

    return () => observer.disconnect()
  }, [])

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      className="opacity-40"
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      {prefersReducedMotion ? (
        <mesh scale={1.2}>
          <torusKnotGeometry args={[1, 0.3, 128, 32, 2, 3]} />
          <MeshDistortMaterial
            color={wireframeColor}
            attach="material"
            distort={0.3}
            speed={2}
            roughness={0.2}
            metalness={0.8}
            wireframe={true}
          />
        </mesh>
      ) : (
        <FloatingShape wireframeColor={wireframeColor} />
      )}
    </Canvas>
  )
}
