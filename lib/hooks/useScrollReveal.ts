'use client'

import { useSyncExternalStore } from 'react'

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

const subscribeToReducedMotion = (callback: () => void) => {
  if (typeof window === 'undefined' || !window.matchMedia) return () => undefined
  const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY)
  mediaQuery.addEventListener('change', callback)
  return () => mediaQuery.removeEventListener('change', callback)
}

const getReducedMotionSnapshot = () =>
  typeof window !== 'undefined' && !!window.matchMedia
    ? window.matchMedia(REDUCED_MOTION_QUERY).matches
    : false

// Server render assumes full motion; the client snapshot corrects it on hydration.
const getReducedMotionServerSnapshot = () => false

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  )
}
