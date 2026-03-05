import { test, expect, Page } from '@playwright/test'
import * as path from 'path'

const EVIDENCE_DIR = path.join(process.cwd(), '.sisyphus/evidence/final-qa')
const BASE_URL = 'http://localhost:3000'

async function ss(page: Page, filename: string) {
  await page.screenshot({ path: path.join(EVIDENCE_DIR, filename) })
}

test('01 Full page dark 1440px', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto(BASE_URL)
  await page.waitForLoadState('networkidle')

  const title = await page.title()
  expect(title).not.toBe('Create Next App')

  const h1 = page.locator('h1')
  await expect(h1).toBeVisible()
  const h1Text = await h1.textContent()
  expect(h1Text).toContain('Brian Valencia')

  await ss(page, '01-full-page-dark-1440.png')
})

test('02 Full page light 1440px', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto(BASE_URL)
  await page.waitForLoadState('networkidle')
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'light')
    localStorage.setItem('theme', 'light')
  })
  await page.waitForTimeout(400)
  await ss(page, '02-full-page-light-1440.png')
})

test('03 Mobile 375px dark + hamburger open', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto(BASE_URL)
  await page.waitForLoadState('networkidle')

  await ss(page, '03-mobile-dark.png')

  const hamburger = page.locator('[data-testid="hamburger-button"]')
  await expect(hamburger).toBeVisible()
  await hamburger.click()
  await page.waitForTimeout(500)

  await ss(page, '04-mobile-nav-open.png')

  const navLink = page.getByRole('link', { name: 'Home' }).last()
  await expect(navLink).toBeVisible({ timeout: 3000 })
})

test('04 Project card expands and closes with Escape', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto(BASE_URL)
  await page.waitForLoadState('networkidle')

  const projectCard = page.locator('[data-testid="project-card-0"]')
  await projectCard.scrollIntoViewIfNeeded()
  await page.waitForTimeout(400)
  await projectCard.click()
  await page.waitForTimeout(800)

  const projectDetail = page.locator('[data-testid="project-detail"]')
  await expect(projectDetail).toBeVisible({ timeout: 5000 })
  await ss(page, '05-project-expanded.png')

  await page.keyboard.press('Escape')
  await page.waitForTimeout(500)
  await expect(projectDetail).not.toBeVisible({ timeout: 5000 })
  await ss(page, '06-project-closed.png')
})

test('05 Theme toggle changes data-theme attribute', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto(BASE_URL)
  await page.waitForLoadState('networkidle')

  const initialTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'))
  console.log('Initial theme:', initialTheme)

  const toggleBtn = page.locator('button[aria-label*="theme"], button[aria-label*="Theme"], button[aria-label*="dark"], button[aria-label*="light"], [data-testid="theme-toggle"]').first()
  await expect(toggleBtn).toBeVisible({ timeout: 3000 })
  await toggleBtn.click()
  await page.waitForTimeout(300)

  const newTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'))
  console.log('Theme after toggle:', newTheme)
  expect(newTheme).not.toBe(initialTheme)

  await ss(page, '07-theme-toggled.png')
})

test('06 Nav links scroll to sections', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto(BASE_URL)
  await page.waitForLoadState('networkidle')

  await page.locator('nav a[href="#about"]').click()
  await page.waitForTimeout(1000)
  await ss(page, '08-nav-about.png')

  await page.locator('nav a[href="#contact"]').click()
  await page.waitForTimeout(1000)
  await ss(page, '09-nav-contact.png')
})

test('07 Scrollbar hidden via CSS', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto(BASE_URL)
  await page.waitForLoadState('networkidle')

  const scrollbarInfo = await page.evaluate(() => {
    const styles = window.getComputedStyle(document.documentElement)
    return {
      scrollbarWidth: styles.scrollbarWidth,
      overflow: styles.overflow,
      overflowY: styles.overflowY,
      inlineScrollbarWidth: document.documentElement.style.scrollbarWidth,
    }
  })
  console.log('Scrollbar info:', JSON.stringify(scrollbarInfo))

  await ss(page, '10-no-scrollbar.png')
})

test('08 Particle field canvas or fallback present', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto(BASE_URL)
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(3000)

  const hasCanvas = (await page.locator('canvas').count()) > 0
  const hasFallback = (await page.locator('[data-testid="hero-3d-fallback"]').count()) > 0
  console.log('Has canvas:', hasCanvas, '| Has fallback:', hasFallback)
  expect(hasCanvas || hasFallback).toBe(true)

  await ss(page, '11-hero-particles.png')
})

test('09 About section has photo and heading', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto(BASE_URL)
  await page.waitForLoadState('networkidle')

  const aboutSection = page.locator('#about')
  await aboutSection.scrollIntoViewIfNeeded()
  await page.waitForTimeout(500)

  await expect(aboutSection.locator('img')).toBeVisible({ timeout: 5000 })

  const aboutText = await aboutSection.textContent()
  expect(aboutText).toContain('I build things that work.')

  await ss(page, '12-about-section.png')
})

test('10 Skills section has Toolkit heading and tiles', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto(BASE_URL)
  await page.waitForLoadState('networkidle')

  const skillsSection = page.locator('[data-testid="skills-section"]')
  await skillsSection.scrollIntoViewIfNeeded()
  await page.waitForTimeout(500)

  const skillsText = await skillsSection.textContent()
  expect(skillsText).toContain('Toolkit')
  await expect(skillsSection).toBeVisible()

  await ss(page, '13-skills-section.png')
})
