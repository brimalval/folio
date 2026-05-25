# Particle System Fix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix two particle background bugs — group rotation masquerading as drift, and stale cursor repulsion zones — by removing object-level rotation, adding per-particle sinusoidal drift, and correcting the repulsion distance check to use current particle positions.

**Architecture:** Single file change to `app/components/three-canvas.tsx`. `createParticleData` gains a `driftParams` Float32Array (6 values per particle). `restPositionsRef` becomes `spawnPositionsRef` (fixed spawn coords only). The `useFrame` loop computes a sinusoidal rest target each frame and checks repulsion against current particle positions instead of rest positions. Object-level rotation is removed entirely.

**Tech Stack:** Three.js, React Three Fiber (`@react-three/fiber`), TypeScript, Vitest

---

## Files

| File | Change |
|------|--------|
| `app/components/three-canvas.tsx` | Modify — all implementation changes |
| `app/components/__tests__/three-canvas.test.ts` | Create — unit tests for `createParticleData` |

---

### Task 1: Export `createParticleData` and add `driftParams` (TDD)

**Files:**
- Modify: `app/components/three-canvas.tsx` (line 27)
- Create: `app/components/__tests__/three-canvas.test.ts`

- [ ] **Step 1: Write failing tests**

Create `app/components/__tests__/three-canvas.test.ts`:

```ts
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
```

- [ ] **Step 2: Run to confirm the tests fail**

```bash
npx vitest run app/components/__tests__/three-canvas.test.ts
```

Expected: `SyntaxError` or import error — `createParticleData` is not exported yet.

- [ ] **Step 3: Export `createParticleData` and add `driftParams`**

In `app/components/three-canvas.tsx`, replace the `createParticleData` function (currently line 27) with:

```ts
export function createParticleData(count: number) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const driftParams = new Float32Array(count * 6);
  for (let i = 0; i < count; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 12;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
    const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    colors[i * 3]     = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
    driftParams[i * 6]     = 0.3 + Math.random() * 0.4; // ampX
    driftParams[i * 6 + 1] = 0.3 + Math.random() * 0.4; // ampY
    driftParams[i * 6 + 2] = 0.2 + Math.random() * 0.3; // freqX (rad/s)
    driftParams[i * 6 + 3] = 0.2 + Math.random() * 0.3; // freqY (rad/s)
    driftParams[i * 6 + 4] = Math.random() * Math.PI * 2; // phaseX
    driftParams[i * 6 + 5] = Math.random() * Math.PI * 2; // phaseY
  }
  return { positions, colors, driftParams };
}
```

- [ ] **Step 4: Run tests to confirm they pass**

```bash
npx vitest run app/components/__tests__/three-canvas.test.ts
```

Expected: `5 passed`.

- [ ] **Step 5: Run full suite to confirm no regressions**

```bash
npx vitest run
```

Expected: all tests pass (same count as before, plus 5 new).

- [ ] **Step 6: Commit**

```bash
git add app/components/three-canvas.tsx app/components/__tests__/three-canvas.test.ts
git commit -m "feat: export createParticleData with driftParams for per-particle sinusoidal drift"
```

---

### Task 2: Rename `restPositionsRef` → `spawnPositionsRef`

**Files:**
- Modify: `app/components/three-canvas.tsx` (lines 56–64, 96–99, 120)

This is a pure rename with no behavior change. Every reference to `restPositions` becomes `spawnPositions`.

- [ ] **Step 1: Rename the ref declaration**

Find (around line 56):
```ts
const restPositionsRef = useRef<Float32Array>(
  new Float32Array(particleData.positions),
);
```
Replace with:
```ts
const spawnPositionsRef = useRef<Float32Array>(
  new Float32Array(particleData.positions),
);
```

- [ ] **Step 2: Rename the local variable in `useFrame`**

Find (around line 63):
```ts
const restPositions = restPositionsRef.current;
```
Replace with:
```ts
const spawnPositions = spawnPositionsRef.current;
```

- [ ] **Step 3: Update the `reducedMotion` reset block**

Find (around lines 73–77):
```ts
for (let i = 0; i < positions.length; i += 3) {
  positions[i] = restPositions[i];
  positions[i + 1] = restPositions[i + 1];
  positions[i + 2] = restPositions[i + 2];
}
```
Replace with:
```ts
for (let i = 0; i < positions.length; i += 3) {
  positions[i]     = spawnPositions[i];
  positions[i + 1] = spawnPositions[i + 1];
  positions[i + 2] = spawnPositions[i + 2];
}
```

- [ ] **Step 4: Replace the entire `for` loop body with renamed variables**

The loop body references `restX`, `restY`, `restZ` in four places (declaration, `if (hasInfluence)` distance check, repulsion target, and Z ease). Replace the **entire contents** of the `for (let i = 0; i < positions.length; i += 3)` block with this identical-behavior version using the new names:

```ts
for (let i = 0; i < positions.length; i += 3) {
  const spawnX = spawnPositions[i];
  const spawnY = spawnPositions[i + 1];
  const spawnZ = spawnPositions[i + 2];
  let targetX = spawnX;
  let targetY = spawnY;

  if (hasInfluence) {
    const dx = spawnX - cursorWorldX;
    const dy = spawnY - cursorWorldY;
    const distSq = dx * dx + dy * dy;

    if (distSq < radiusSq) {
      const distance = Math.sqrt(distSq);
      const safeDistance = distance || 0.0001;
      const falloff = 1 - distance / CURSOR_REPULSION_RADIUS;
      const repulsion = CURSOR_REPULSION_STRENGTH * falloff * influence;
      targetX = spawnX + (dx / safeDistance) * repulsion;
      targetY = spawnY + (dy / safeDistance) * repulsion;
    }
  }

  positions[i]     += (targetX - positions[i])     * PARTICLE_EASE;
  positions[i + 1] += (targetY - positions[i + 1]) * PARTICLE_EASE;
  positions[i + 2] += (spawnZ  - positions[i + 2]) * PARTICLE_EASE;
}
```

- [ ] **Step 6: Run full suite to confirm no regressions**

```bash
npx vitest run
```

Expected: all tests still pass — this is a rename only, behavior is identical.

- [ ] **Step 7: Commit**

```bash
git add app/components/three-canvas.tsx
git commit -m "refactor: rename restPositionsRef to spawnPositionsRef"
```

---

### Task 3: Remove object rotation and rewrite the `useFrame` particle loop

**Files:**
- Modify: `app/components/three-canvas.tsx` (lines 84–121)

This task: (a) deletes the two rotation lines, (b) introduces `t` and `driftParams`, (c) computes a sinusoidal rest target per particle, (d) fixes repulsion to check current position.

- [ ] **Step 1: Delete the rotation lines**

Remove these two lines (currently around lines 84–85):
```ts
points.rotation.y = clock.elapsedTime * 0.015;
points.rotation.x = Math.sin(clock.elapsedTime * 0.01) * 0.05;
```

- [ ] **Step 2: Add `t` and `driftParams` after the existing local variable declarations**

Immediately before the `const targetIntensity` line, add:
```ts
const t = clock.elapsedTime;
const driftParams = particleData.driftParams;
```

- [ ] **Step 3: Replace the inner particle loop body**

The current loop body (inside `for (let i = 0; i < positions.length; i += 3)`) reads `spawnX/Y/Z`, computes `targetX/Y`, runs the repulsion check, then eases. Replace the **entire contents** of that `for` block with:

```ts
for (let i = 0; i < positions.length; i += 3) {
  const pi = i / 3;
  const dp = pi * 6;
  const spawnX = spawnPositions[i];
  const spawnY = spawnPositions[i + 1];
  const spawnZ = spawnPositions[i + 2];

  // Sinusoidal drift: rest target oscillates around the spawn point
  const restX = spawnX + Math.sin(t * driftParams[dp + 2] + driftParams[dp + 4]) * driftParams[dp];
  const restY = spawnY + Math.cos(t * driftParams[dp + 3] + driftParams[dp + 5]) * driftParams[dp + 1];
  let targetX = restX;
  let targetY = restY;

  if (hasInfluence) {
    // Distance check uses CURRENT position, not rest position
    const dx = positions[i]     - cursorWorldX;
    const dy = positions[i + 1] - cursorWorldY;
    const distSq = dx * dx + dy * dy;

    if (distSq < radiusSq) {
      const distance = Math.sqrt(distSq);
      const safeDistance = distance || 0.0001;
      const falloff = 1 - distance / CURSOR_REPULSION_RADIUS;
      const repulsion = CURSOR_REPULSION_STRENGTH * falloff * influence;
      targetX = positions[i]     + (dx / safeDistance) * repulsion;
      targetY = positions[i + 1] + (dy / safeDistance) * repulsion;
    }
  }

  positions[i]     += (targetX - positions[i])     * PARTICLE_EASE;
  positions[i + 1] += (targetY - positions[i + 1]) * PARTICLE_EASE;
  positions[i + 2] += (spawnZ  - positions[i + 2]) * PARTICLE_EASE;
}
```

- [ ] **Step 4: Run full suite to confirm no regressions**

```bash
npx vitest run
```

Expected: all tests pass.

- [ ] **Step 5: Commit**

```bash
git add app/components/three-canvas.tsx
git commit -m "feat: sinusoidal per-particle drift, fix cursor repulsion to use current positions"
```

---

### Task 4: Visual verification

- [ ] **Step 1: Start the dev server**

```bash
npm run dev
```

Open `http://localhost:3000`.

- [ ] **Step 2: Verify idle drift**

Move the cursor off-screen and watch for 5–10 seconds. Each particle should trace a slow, independent arc. There should be no group rotation — the cloud should not orbit any center point.

- [ ] **Step 3: Verify repulsion**

Move the cursor slowly across the hero section. Particles near the cursor should push outward from wherever the cursor currently is. If a particle has drifted away from its original area, it should still react when the cursor passes near its current location.

- [ ] **Step 4: Verify return-to-path**

Hold the cursor over a group of particles until they scatter, then move it away. They should ease back toward their drift arcs (not snap to fixed spawn points).

- [ ] **Step 5: Verify reduced-motion path is unaffected**

In browser DevTools, run:
```js
window.matchMedia('(prefers-reduced-motion: reduce)')
```
Or temporarily set `const prefersReducedMotion = true;` in the component (line 151), reload, and confirm particles are frozen at spawn positions with no animation.

Revert if changed:
```ts
const prefersReducedMotion = false;
```
