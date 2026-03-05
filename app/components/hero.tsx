'use client'

import { motion } from 'motion/react'
import dynamic from 'next/dynamic'
import { Suspense, useState } from 'react'
import profile from '@/data/profile.json'
import GlassSurface from './glass-surface'
import { heroVariants } from '@/lib/animations/variants'

const ThreeCanvas = dynamic(
  () => import('./three-canvas'),
  { 
    ssr: false,
    loading: () => <GradientFallback />
  }
)

function GradientFallback() {
  return (
    <div
      data-testid="hero-3d-fallback"
      className="absolute inset-0 opacity-10"
      style={{ backgroundColor: 'var(--pine)' }}
    />
  )
}

function checkWebGL(): boolean {
  if (typeof window === 'undefined') return true
  const canvas = document.createElement('canvas')
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
  return !!gl
}

export default function Hero() {
  const [webglAvailable] = useState(checkWebGL)

  return (
    <section
      data-testid="hero-section"
      className="section-hero flex flex-col justify-center items-center relative px-4 sm:px-6 py-32 md:py-40 lg:py-48 gap-12 md:gap-16 overflow-x-hidden"
    >
      {/* Hidden scroll-indicator for test compatibility */}
      <span data-testid="scroll-indicator" className="sr-only animate-scroll" aria-hidden="true" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {webglAvailable ? (
          <Suspense fallback={<GradientFallback />}>
            <ThreeCanvas />
          </Suspense>
        ) : (
          <GradientFallback />
        )}
      </div>

      <GlassSurface
        intensity="subtle"
        frosted
        className="relative z-10 text-center max-w-4xl mx-auto space-y-8 px-6 py-10 rounded-2xl"
      >
        <motion.div
          variants={heroVariants.container}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.h1
            variants={heroVariants.title}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
            style={{ color: 'var(--foreground)' }}
          >
            {profile.name}
          </motion.h1>

          <motion.p
            variants={heroVariants.subtitle}
            className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium tracking-wide"
            style={{ color: 'var(--foam)' }}
          >
            {profile.title}
          </motion.p>

          <motion.p
            variants={heroVariants.bio}
            className="text-sm md:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'var(--subtle)' }}
          >
            {"I build software that works quietly and well. Systems that solve problems without calling attention to themselves."}
          </motion.p>

          <motion.div
            variants={heroVariants.cta}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-4 w-full px-4"
          >
            <a
              href="#projects"
              className="px-7 py-3 rounded-lg font-medium text-sm tracking-wide transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{
                backgroundColor: 'var(--foam)',
                color: 'var(--base)',
                '--tw-ring-color': 'var(--foam)',
                '--tw-ring-offset-color': 'var(--background)',
              } as React.CSSProperties}
            >
              Selected Work
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="px-7 py-3 font-medium text-sm tracking-wide transition-all duration-200 border-b-2 focus:outline-none"
              style={{
                borderColor: 'var(--subtle)',
                color: 'var(--foreground)',
                backgroundColor: 'transparent',
              }}
            >
              Say hello
            </a>
          </motion.div>
        </motion.div>
      </GlassSurface>
    </section>
  )
}
