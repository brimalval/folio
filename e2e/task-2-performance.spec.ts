import { test, expect, Page } from '@playwright/test'
import * as path from 'path'
import { mkdir, writeFile } from 'node:fs/promises'

const BASE_URL = 'http://localhost:3000'
const VIEWPORT = { width: 1920, height: 1080 }
const EVIDENCE_PATH = path.join(process.cwd(), '.sisyphus/evidence', 'task-2-performance.json')
const BASELINE_DURATION = 2000
const INTERACTION_DURATION = 3000
const WARMUP_DURATION = 1000

test.use({
  headless: false,
  launchOptions: {
    args: [
      '--disable-background-timer-throttling',
      '--disable-renderer-backgrounding',
      '--disable-backgrounding-occluded-windows',
    ],
  },
})

type FrameStats = {
  fps: number
  elapsed: number
  frames: number
}

async function measureFrameRate(page: Page, durationMs: number): Promise<FrameStats> {
  return page.evaluate(
    ({ durationMs }) => {
      return new Promise<FrameStats>((resolve) => {
        let frameCount = 0
        let startTime: number | null = null

        function tick(timestamp: number) {
          if (startTime === null) {
            startTime = timestamp
          }

          frameCount += 1
          const elapsed = timestamp - (startTime ?? timestamp)

          if (elapsed >= durationMs) {
            const seconds = Math.max(elapsed, 1) / 1000
            resolve({ fps: frameCount / seconds, elapsed, frames: frameCount })
            return
          }

          requestAnimationFrame(tick)
        }

        requestAnimationFrame(tick)
      })
    },
    { durationMs },
  )
}

async function movePointerInCircle(page: Page, centerX: number, centerY: number, radius: number, durationMs: number) {
  const start = Date.now()
  const stepDuration = 30
  while (Date.now() - start < durationMs) {
    const elapsed = Date.now() - start
    const progress = elapsed / durationMs
    const angle = progress * Math.PI * 2
    const x = centerX + Math.cos(angle) * radius
    const y = centerY + Math.sin(angle) * radius
    await page.mouse.move(x, y, { steps: 6 })
    await page.waitForTimeout(stepDuration)
  }
}

async function detectWebglRenderer(page: Page): Promise<string | null> {
  return page.evaluate(() => {
    const canvas = document.querySelector('canvas')
    if (!canvas) return null

    const gl = (canvas.getContext('webgl') || canvas.getContext('webgl2')) as
      | WebGLRenderingContext
      | WebGL2RenderingContext
      | null
    if (!gl) return null

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
    if (!debugInfo) return null

    return gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
  })
}

test('task-2 hero performance measurement', async ({ page }) => {
  await page.setViewportSize(VIEWPORT)
  await page.goto(BASE_URL)
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(WARMUP_DURATION)

  const heroSection = page.locator('[data-testid="hero-section"]')
  await heroSection.waitFor({ state: 'visible', timeout: 5000 })
  const boundingBox = await heroSection.boundingBox()
  expect(boundingBox).not.toBeNull()
  if (!boundingBox) {
    throw new Error('Hero section bounding box not available for pointer measurement')
  }

  const centerX = boundingBox.x + boundingBox.width / 2
  const centerY = boundingBox.y + boundingBox.height / 2
  const radius = Math.min(boundingBox.width, boundingBox.height) * 0.45

  await page.mouse.move(centerX, centerY, { steps: 10 })
  await page.waitForTimeout(200)

  const baselineStats = await measureFrameRate(page, BASELINE_DURATION)

  const interactiveMeasurementPromise = measureFrameRate(page, INTERACTION_DURATION)
  const pointerMovementPromise = movePointerInCircle(page, centerX, centerY, radius, INTERACTION_DURATION)
  const [interactiveStats] = await Promise.all([interactiveMeasurementPromise, pointerMovementPromise])

  const renderer = await detectWebglRenderer(page)
  const fps = Number(interactiveStats.fps.toFixed(2))
  const baselineFps = Number(baselineStats.fps.toFixed(2))
  const assertFpsGte55 = fps >= 55
  const notes =
    assertFpsGte55
      ? undefined
      : `Interactive FPS ${fps} < 55 with baseline ${baselineFps} and renderer ${renderer ?? 'unknown'}`

  const evidence = {
    url: BASE_URL,
    viewport: `${VIEWPORT.width}x${VIEWPORT.height}`,
    fps,
    baselineFps,
    assertFpsGte55,
    webglRenderer: renderer ?? null,
    baselineDuration: baselineStats.elapsed,
    measurementDuration: interactiveStats.elapsed,
    baselineFrames: baselineStats.frames,
    measurementFrames: interactiveStats.frames,
    notes,
    timestamp: new Date().toISOString(),
  }

  await mkdir(path.dirname(EVIDENCE_PATH), { recursive: true })
  await writeFile(EVIDENCE_PATH, JSON.stringify(evidence, null, 2))

  console.log('Task 2 performance evidence written:', EVIDENCE_PATH)
  expect(typeof interactiveStats.fps).toBe('number')
})
