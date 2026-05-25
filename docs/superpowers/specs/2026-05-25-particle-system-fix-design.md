# Particle System Fix — Design Spec

**Date:** 2026-05-25
**File:** `app/components/three-canvas.tsx`
**Status:** Approved

---

## Problem

Two bugs in the current particle background, sharing the same root cause:

**Bug 1 — Stale influence zones:** Cursor repulsion computes distance against `restX/restY` (local object-space coordinates). Once the `Points` object rotates, local space and world space diverge, so a particle's visual position and its repulsion trigger zone disagree. A particle far from the cursor gets repelled; a nearby one doesn't.

**Bug 2 — Rotation appearance:** `points.rotation.y/x` rotates the entire `Points` mesh as a rigid body each frame, so all particles orbit the scene center together. This is the "rotating around an origin" visual. Individual particles don't drift independently — the group rotates as one.

---

## Solution

Remove the global object rotation. Replace the static rest position with a per-particle sinusoidal drift target. Fix repulsion to check current particle positions.

### 1. Remove object rotation

Delete from `useFrame`:
```ts
points.rotation.y = clock.elapsedTime * 0.015;
points.rotation.x = Math.sin(clock.elapsedTime * 0.01) * 0.05;
```

The `Points` object stays at identity transform permanently.

### 2. Per-particle drift params

`createParticleData` adds a `driftParams: Float32Array` of 6 values per particle, all randomized at spawn:

| Index | Name    | Range        | Description                        |
|-------|---------|--------------|------------------------------------|
| 0     | `ampX`  | 0.3 – 0.7    | Oscillation amplitude on X (world) |
| 1     | `ampY`  | 0.3 – 0.7    | Oscillation amplitude on Y (world) |
| 2     | `freqX` | 0.2 – 0.5    | Oscillation frequency on X (rad/s) |
| 3     | `freqY` | 0.2 – 0.5    | Oscillation frequency on Y (rad/s) |
| 4     | `phaseX`| 0 – 2π       | Phase offset on X                  |
| 5     | `phaseY`| 0 – 2π       | Phase offset on Y                  |

These values are computed once at module load alongside `positions` and `colors`.

### 3. Rename `restPositionsRef` → `spawnPositionsRef`

The ref now holds fixed spawn coordinates only — it never changes after initialization. The dynamic rest target is computed each frame.

### 4. Dynamic rest target in `useFrame`

Each frame, per particle:
```
restX = spawnX + sin(t × freqX + phaseX) × ampX
restY = spawnY + cos(t × freqY + phaseY) × ampY
```

`targetX/targetY` start as this drift target. Repulsion may override them.

### 5. Fix repulsion coordinate

Change the distance check from `restX/restY` to the particle's **current position** (`positions[i]`, `positions[i+1]`). Repulsion acts on where a particle is, not where it should be.

Repulsion sets `targetX/targetY` to a displaced point based on the current-position-to-cursor vector.

### 6. Return-to-path after repulsion

After the cursor moves away, `targetX/targetY` reverts to the sinusoidal drift target (spawn + oscillation). The particle eases back to its current drift position. The oscillation origin (spawn point) is never modified by repulsion.

Z axis: unchanged — particles continue easing toward `spawnZ` each frame.

---

## Constants (unchanged)

Existing constants remain as-is:

```ts
const CURSOR_REPULSION_RADIUS   = 1.5
const CURSOR_REPULSION_STRENGTH = 0.65
const CURSOR_INTENSITY_EASE     = 0.08
const PARTICLE_EASE             = 0.12
```

No new global constants needed; drift amplitude/frequency ranges are inline in `createParticleData`.

---

## Data Shape

```ts
// Before
{ positions: Float32Array, colors: Float32Array }

// After
{ positions: Float32Array, colors: Float32Array, driftParams: Float32Array }
```

`ParticleField` reads `driftParams` directly from `particleData` inside `useFrame` — no extra ref needed since it never changes after initialization.

---

## Scope

- Single file: `app/components/three-canvas.tsx`
- No new files, no new dependencies
- `reducedMotion` path unchanged (already zeros rotation and resets positions)
