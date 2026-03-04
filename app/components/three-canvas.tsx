'use client'

import { Canvas } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'

function FloatingShape() {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh scale={1.2}>
        <tetrahedronGeometry args={[1, 0]} />
        <MeshDistortMaterial
          color="#c4a7e7"
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
  return (
    <Canvas 
      camera={{ position: [0, 0, 5], fov: 45 }}
      className="opacity-40"
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <FloatingShape />
    </Canvas>
  )
}
