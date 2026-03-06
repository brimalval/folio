import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, render } from '@testing-library/react'
import { useScrollReveal, usePrefersReducedMotion } from '../useScrollReveal'
import React from 'react'

function TestComponent({ options = {} }: { options?: Parameters<typeof useScrollReveal>[0] }) {
  const [ref, isInView] = useScrollReveal(options)
  return <div ref={ref} data-testid="target" data-in-view={isInView} />
}

describe('useScrollReveal', () => {
  const mockObserve = vi.fn()
  const mockUnobserve = vi.fn()
  const mockDisconnect = vi.fn()

  beforeEach(() => {
    window.IntersectionObserver = vi.fn().mockImplementation(function() {
      return {
        observe: mockObserve,
        unobserve: mockUnobserve,
        disconnect: mockDisconnect,
      }
    })
    mockObserve.mockClear()
    mockUnobserve.mockClear()
    mockDisconnect.mockClear()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('returns ref and isInView state', () => {
    const { result } = renderHook(() => useScrollReveal())
    
    expect(result.current).toHaveLength(2)
    expect(result.current[0]).toHaveProperty('current')
    expect(typeof result.current[1]).toBe('boolean')
  })

  it('starts with isInView false', () => {
    const { result } = renderHook(() => useScrollReveal())
    
    expect(result.current[1]).toBe(false)
  })

  it('creates IntersectionObserver with default options', () => {
    render(<TestComponent />)
    
    expect(window.IntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({
        threshold: 0.1,
        rootMargin: '-50px',
      })
    )
  })

  it('creates IntersectionObserver with custom options', () => {
    render(<TestComponent options={{ threshold: 0.5, rootMargin: '-100px' }} />)
    
    expect(window.IntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({
        threshold: 0.5,
        rootMargin: '-100px',
      })
    )
  })
})

describe('usePrefersReducedMotion', () => {
  it('always returns false', () => {
    const { result } = renderHook(() => usePrefersReducedMotion())
    expect(result.current).toBe(false)
  })
})
