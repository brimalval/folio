import { describe, it, expect } from 'vitest'
import { createParticleData } from '../three-canvas'

describe('createParticleData', () => {
  it('returns positions and colors with correct length', () => {
    const { positions, colors } = createParticleData(10)
    expect(positions).toBeInstanceOf(Float32Array)
    expect(positions.length).toBe(30)
    expect(colors).toBeInstanceOf(Float32Array)
    expect(colors.length).toBe(30)
  })

  it('returns driftParams Float32Array with 6 values per particle', () => {
    const { driftParams } = createParticleData(10)
    expect(driftParams).toBeInstanceOf(Float32Array)
    expect(driftParams.length).toBe(60)
  })

  it('drift amplitudes (indices 0,1 per particle) are in [0.3, 0.7]', () => {
    const { driftParams } = createParticleData(50)
    for (let i = 0; i < 50; i++) {
      expect(driftParams[i * 6 + 0]).toBeGreaterThanOrEqual(0.3)
      expect(driftParams[i * 6 + 0]).toBeLessThanOrEqual(0.7)
      expect(driftParams[i * 6 + 1]).toBeGreaterThanOrEqual(0.3)
      expect(driftParams[i * 6 + 1]).toBeLessThanOrEqual(0.7)
    }
  })

  it('drift frequencies (indices 2,3 per particle) are in [0.2, 0.5]', () => {
    const { driftParams } = createParticleData(50)
    for (let i = 0; i < 50; i++) {
      expect(driftParams[i * 6 + 2]).toBeGreaterThanOrEqual(0.2)
      expect(driftParams[i * 6 + 2]).toBeLessThanOrEqual(0.5)
      expect(driftParams[i * 6 + 3]).toBeGreaterThanOrEqual(0.2)
      expect(driftParams[i * 6 + 3]).toBeLessThanOrEqual(0.5)
    }
  })

  it('drift phases (indices 4,5 per particle) are in [0, 2π]', () => {
    const { driftParams } = createParticleData(50)
    for (let i = 0; i < 50; i++) {
      expect(driftParams[i * 6 + 4]).toBeGreaterThanOrEqual(0)
      expect(driftParams[i * 6 + 4]).toBeLessThanOrEqual(Math.PI * 2)
      expect(driftParams[i * 6 + 5]).toBeGreaterThanOrEqual(0)
      expect(driftParams[i * 6 + 5]).toBeLessThanOrEqual(Math.PI * 2)
    }
  })
})
