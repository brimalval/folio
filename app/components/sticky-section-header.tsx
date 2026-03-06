'use client'

import { motion, AnimatePresence } from 'motion/react'
import { useActiveSection } from '@/lib/hooks/use-active-section'
import { usePrefersReducedMotion } from '@/lib/hooks/useScrollReveal'

type StickySectionHeaderProps = {
  sectionId: 'projects' | 'skills'
  title: string
}

const headerVariants = {
  initial: {
    opacity: 0,
    y: -8,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    y: 8,
    transition: {
      duration: 0.2,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
}

export default function StickySectionHeader({
  sectionId,
  title,
}: StickySectionHeaderProps) {
  const { activeId } = useActiveSection(['projects', 'skills'])
  const prefersReducedMotion = usePrefersReducedMotion()

  const isActive = activeId === sectionId

  const headerContent = (
    <div
      className="text-xl md:text-2xl font-bold tracking-tight"
      style={{ color: 'var(--foreground)' }}
      aria-hidden="true"
    >
      {title}
    </div>
  )

  return (
    <div
      className="sticky top-0 z-10 py-4 px-6 -mx-6"
      style={{
        backgroundColor: 'var(--section-bg-color, var(--background))',
      }}
    >
      <div className="max-w-5xl mx-auto">
        {prefersReducedMotion ? (
          isActive ? headerContent : null
        ) : (
          <AnimatePresence mode="wait" initial={false}>
            {isActive && (
              <motion.div
                key={sectionId}
                variants={headerVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {headerContent}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}
