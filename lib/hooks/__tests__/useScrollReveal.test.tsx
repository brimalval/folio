import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { usePrefersReducedMotion } from '../useScrollReveal'

describe('usePrefersReducedMotion', () => {
  const originalMatchMedia = window.matchMedia
  let matches = false
  let listeners: Array<() => void> = []

  beforeEach(() => {
    matches = false
    listeners = []
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      get matches() {
        return matches
      },
      media: query,
      addEventListener: (_event: string, listener: () => void) => listeners.push(listener),
      removeEventListener: (_event: string, listener: () => void) => {
        listeners = listeners.filter((l) => l !== listener)
      },
    }))
  })

  afterEach(() => {
    window.matchMedia = originalMatchMedia
  })

  it('queries prefers-reduced-motion: reduce', () => {
    renderHook(() => usePrefersReducedMotion())
    expect(window.matchMedia).toHaveBeenCalledWith('(prefers-reduced-motion: reduce)')
  })

  it('returns false when the user has no motion preference', () => {
    const { result } = renderHook(() => usePrefersReducedMotion())
    expect(result.current).toBe(false)
  })

  it('returns true when the user prefers reduced motion', () => {
    matches = true
    const { result } = renderHook(() => usePrefersReducedMotion())
    expect(result.current).toBe(true)
  })

  it('updates when the preference changes', () => {
    const { result } = renderHook(() => usePrefersReducedMotion())
    expect(result.current).toBe(false)
    act(() => {
      matches = true
      listeners.forEach((listener) => listener())
    })
    expect(result.current).toBe(true)
  })

  it('unsubscribes on unmount', () => {
    const { unmount } = renderHook(() => usePrefersReducedMotion())
    expect(listeners).toHaveLength(1)
    unmount()
    expect(listeners).toHaveLength(0)
  })
})
