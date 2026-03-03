'use client'

import { motion } from 'motion/react'
import { Canvas } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import { Suspense, useState, useEffect } from 'react'
import profile from '@/data/profile.json'

function FloatingShape() {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh scale={1.2}>
        <icosahedronGeometry args={[1, 2]} />
        <MeshDistortMaterial
          color="#c4a7e7"
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  )
}

function GradientFallback() {
  return (
    <div 
      data-testid="hero-3d-fallback"
      className="w-64 h-64 md:w-80 md:h-80 rounded-full opacity-60"
      style={{
        background: 'radial-gradient(circle at 30% 30%, var(--iris) 0%, var(--love) 50%, var(--pine) 100%)',
        filter: 'blur(40px)',
        animation: 'float 6s ease-in-out infinite',
      }}
    />
  )
}

function ScrollIndicator() {
  return (
    <motion.div
      data-testid="scroll-indicator"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.8 }}
      className="flex flex-col items-center gap-2 cursor-pointer animate-scroll"
    >
      <span className="text-sm tracking-widest uppercase" style={{ color: 'var(--subtle)' }}>
        Scroll
      </span>
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor"
        strokeWidth="1.5"
        style={{ color: 'var(--iris)' }}
      >
        <path d="M12 5v14M19 12l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </motion.div>
  )
}

export default function Hero() {
  const [webglAvailable, setWebglAvailable] = useState(true)

  useEffect(() => {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    setWebglAvailable(!!gl)
  }, [])

  return (
    <section 
      data-testid="hero-section"
      className="min-h-screen flex flex-col justify-center items-center relative px-6 py-24 md:py-32 lg:py-40 gap-12 md:gap-16"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {webglAvailable ? (
          <Suspense fallback={<GradientFallback />}>
            <Canvas 
              camera={{ position: [0, 0, 5], fov: 45 }}
              className="opacity-40"
              fallback={<GradientFallback />}
            >
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <FloatingShape />
            </Canvas>
          </Suspense>
        ) : (
          <div className="flex items-center justify-center h-full">
            <GradientFallback />
          </div>
        )}
      </div>

      <motion.div 
        className="relative z-10 text-center max-w-4xl mx-auto space-y-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.h1 
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight"
          style={{ color: 'var(--foreground)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {profile.name}
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl lg:text-3xl font-medium tracking-wide"
          style={{ color: 'var(--iris)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {profile.title}
        </motion.p>
        
        <motion.p 
          className="text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed"
          style={{ color: 'var(--subtle)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {profile.bio}
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <a
            href="#projects"
            className="px-8 py-4 rounded-full font-medium text-base transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 cta"
            style={{ 
              backgroundColor: 'var(--iris)', 
              color: 'var(--base)',
              '--tw-ring-color': 'var(--iris)',
              '--tw-ring-offset-color': 'var(--background)',
            } as React.CSSProperties}
          >
            View My Work
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="px-8 py-4 rounded-full font-medium text-base transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 cta"
            style={{ 
              backgroundColor: 'transparent', 
              color: 'var(--foreground)',
              border: '1px solid var(--subtle)',
              '--tw-ring-color': 'var(--subtle)',
              '--tw-ring-offset-color': 'var(--background)',
            } as React.CSSProperties}
          >
            Get in Touch
          </a>
        </motion.div>
      </motion.div>

      <motion.div 
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <ScrollIndicator />
      </motion.div>
    </section>
  )
}
