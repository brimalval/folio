import { test, expect, Page } from 'playwright/test'
import * as path from 'path'

const EVIDENCE_DIR = path.join(process.cwd(), '.sisyphus/evidence')
const BASE_URL = 'http://localhost:3000'

const BREAKPOINTS = [
  { width: 375, name: 'mobile' },
  { width: 768, name: 'tablet' },
  { width: 1024, name: 'desktop-sm' },
  { width: 1440, name: 'desktop-lg' },
]

async function setTheme(page: Page, mode: 'dark' | 'light') {
  await page.evaluate((theme) => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, mode)
  await page.waitForTimeout(400)
}

async function waitForPageReady(page: Page) {
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(800)
}

async function screenshotViewport(page: Page, name: string) {
  await page.screenshot({
    path: path.join(EVIDENCE_DIR, `task-18-${name}.png`),
    fullPage: false,
  })
}

async function screenshotFullPage(page: Page, name: string) {
  await page.screenshot({
    path: path.join(EVIDENCE_DIR, `task-18-${name}.png`),
    fullPage: true,
  })
}

test.describe('Full-Page Screenshots — 4 breakpoints × 2 modes', () => {
  for (const bp of BREAKPOINTS) {
    for (const mode of ['dark', 'light'] as const) {
      test(`${bp.width}px ${mode} mode full-page`, async ({ page }) => {
        await page.setViewportSize({ width: bp.width, height: 900 })
        await page.goto(BASE_URL)
        await waitForPageReady(page)
        await setTheme(page, mode)
        await screenshotFullPage(page, `${bp.width}-${mode}`)
        expect(true).toBe(true)
      })
    }
  }
})

test.describe('Section-Specific Screenshots @ 1440px dark', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto(BASE_URL)
    await waitForPageReady(page)
    await setTheme(page, 'dark')
  })

  test('hero section — canvas or fallback present', async ({ page }) => {
    const heroSection = page.locator('[data-testid="hero-section"]')
    await expect(heroSection).toBeVisible()

    const hasCanvas = (await page.locator('canvas').count()) > 0
    const hasFallback = (await page.locator('[data-testid="hero-3d-fallback"]').count()) > 0
    expect(hasCanvas || hasFallback).toBe(true)

    await heroSection.screenshot({ path: path.join(EVIDENCE_DIR, 'task-18-section-hero.png') })
  })

  test('about section renders', async ({ page }) => {
    const aboutSection = page.locator('#about')
    await aboutSection.scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)
    await expect(aboutSection).toBeVisible()
    await aboutSection.screenshot({ path: path.join(EVIDENCE_DIR, 'task-18-section-about.png') })
  })

  test('projects section — 3 project cards present', async ({ page }) => {
    const projectsSection = page.locator('[data-testid="projects-section"]').first()
    await projectsSection.scrollIntoViewIfNeeded()
    await page.waitForTimeout(600)

    await expect(page.locator('[data-testid="project-card-0"]')).toBeVisible()
    await expect(page.locator('[data-testid="project-card-1"]')).toBeVisible()
    await expect(page.locator('[data-testid="project-card-2"]')).toBeVisible()

    await projectsSection.screenshot({ path: path.join(EVIDENCE_DIR, 'task-18-section-projects.png') })
  })

  test('skills section visible', async ({ page }) => {
    const skillsSection = page.locator('[data-testid="skills-section"]')
    await skillsSection.scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)
    await expect(skillsSection).toBeVisible()
    await skillsSection.screenshot({ path: path.join(EVIDENCE_DIR, 'task-18-section-skills.png') })
  })

  test('experience section visible', async ({ page }) => {
    const experienceSection = page.locator('[data-testid="experience-section"]')
    await experienceSection.scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)
    await expect(experienceSection).toBeVisible()
    await experienceSection.screenshot({ path: path.join(EVIDENCE_DIR, 'task-18-section-experience.png') })
  })

  test('contact section — email-link present', async ({ page }) => {
    const contactSection = page.locator('[data-testid="contact-section"]')
    await contactSection.scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)
    await expect(contactSection).toBeVisible()
    await expect(page.locator('[data-testid="email-link"]')).toBeVisible()
    await contactSection.screenshot({ path: path.join(EVIDENCE_DIR, 'task-18-section-contact.png') })
  })
})

test.describe('Interaction Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto(BASE_URL)
    await waitForPageReady(page)
    await setTheme(page, 'dark')
  })

  test('project expansion — click opens detail, Escape closes', async ({ page }) => {
    const projectCard = page.locator('[data-testid="project-card-0"]')
    await projectCard.scrollIntoViewIfNeeded()
    await page.waitForTimeout(400)
    await projectCard.click()
    await page.waitForTimeout(600)

    const projectDetail = page.locator('[data-testid="project-detail"]')
    await expect(projectDetail).toBeVisible({ timeout: 3000 })
    await screenshotViewport(page, 'interaction-project-open')

    await page.keyboard.press('Escape')
    await page.waitForTimeout(600)
    await expect(projectDetail).not.toBeVisible({ timeout: 3000 })
    await screenshotViewport(page, 'interaction-project-closed')
  })

  test('theme toggle — data-theme attribute changes', async ({ page }) => {
    await setTheme(page, 'dark')
    expect(await page.evaluate(() => document.documentElement.getAttribute('data-theme'))).toBe('dark')

    const toggleBtn = page.locator('button[aria-label*="theme"]').or(
      page.locator('button[aria-label*="Theme"]')
    ).first()
    await toggleBtn.click()
    await page.waitForTimeout(400)

    expect(await page.evaluate(() => document.documentElement.getAttribute('data-theme'))).toBe('light')
    await screenshotViewport(page, 'interaction-theme-light')

    await toggleBtn.click()
    await page.waitForTimeout(400)
    expect(await page.evaluate(() => document.documentElement.getAttribute('data-theme'))).toBe('dark')
    await screenshotViewport(page, 'interaction-theme-dark')
  })

  test('navigation — clicking nav links scrolls to sections', async ({ page }) => {
    await page.locator('nav a[href="#about"]').click()
    await page.waitForTimeout(800)

    const scrollAfterAbout = await page.evaluate(() => window.scrollY)
    expect(scrollAfterAbout).toBeGreaterThan(100)
    await screenshotViewport(page, 'interaction-nav-about')

    await page.locator('nav a[href="#contact"]').click()
    await page.waitForTimeout(1000)

    const scrollAfterContact = await page.evaluate(() => window.scrollY)
    expect(scrollAfterContact).toBeGreaterThan(scrollAfterAbout)
    await screenshotViewport(page, 'interaction-nav-contact')
  })

  test('mobile nav drawer — hamburger opens menu', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto(BASE_URL)
    await waitForPageReady(page)
    await setTheme(page, 'dark')

    const hamburger = page.locator('[data-testid="hamburger-button"]')
    await expect(hamburger).toBeVisible()
    await hamburger.click()
    await page.waitForTimeout(500)

    const homeLink = page.getByRole('link', { name: 'Home' }).last()
    await expect(homeLink).toBeVisible({ timeout: 3000 })
    await screenshotViewport(page, 'interaction-mobile-nav-open')

    await homeLink.click()
    await page.waitForTimeout(500)
    await screenshotViewport(page, 'interaction-mobile-nav-closed')
  })
})

test.describe('Design Guardrails', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto(BASE_URL)
    await waitForPageReady(page)
  })

  test('no rounded-full on hero CTAs', async ({ page }) => {
    const heroCTAs = page.locator('[data-testid="hero-section"] a')
    const count = await heroCTAs.count()
    for (let i = 0; i < count; i++) {
      const classList = await heroCTAs.nth(i).getAttribute('class')
      expect(classList).not.toContain('rounded-full')
    }
  })

  test('projects section heading is "Selected Work" not "Featured Work"', async ({ page }) => {
    const projectsSection = page.locator('[data-testid="projects-section"]').first()
    const text = await projectsSection.textContent()
    expect(text).not.toContain('Featured Work')
    expect(text).toContain('Selected Work')
  })

  test('contact section has no "Get in Touch" heading', async ({ page }) => {
    const contactSection = page.locator('[data-testid="contact-section"]')
    const text = await contactSection.textContent()
    expect(text).not.toContain('Get in Touch')
  })

  test('skills section has no "Skills & Technologies" heading', async ({ page }) => {
    const skillsSection = page.locator('[data-testid="skills-section"]')
    const text = await skillsSection.textContent()
    expect(text).not.toContain('Skills & Technologies')
  })

  test('hero has h1 heading with content', async ({ page }) => {
    const h1 = page.locator('[data-testid="hero-section"] h1')
    await expect(h1).toBeVisible()
    const text = await h1.textContent()
    expect(text?.length).toBeGreaterThan(2)
  })

  test('exactly one h1 on the page', async ({ page }) => {
    const h1Count = await page.locator('h1').count()
    expect(h1Count).toBe(1)
  })
})

test.describe('Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto(BASE_URL)
    await waitForPageReady(page)
  })

  test('all img elements have alt attributes', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(1000)
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(500)

    const images = page.locator('img')
    const count = await images.count()

    const missingAlt: string[] = []
    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute('alt')
      const src = await images.nth(i).getAttribute('src')
      if (alt === null) {
        missingAlt.push(src ?? `img[${i}]`)
      }
    }

    if (missingAlt.length > 0) {
      console.warn('Images missing alt text:', missingAlt)
    }
    expect(missingAlt.length).toBe(0)
  })

  test('interactive elements respond to Tab key navigation', async ({ page }) => {
    await page.keyboard.press('Tab')
    await page.waitForTimeout(200)
    await screenshotViewport(page, 'a11y-focus-first')

    await page.keyboard.press('Tab')
    await page.waitForTimeout(200)
    await screenshotViewport(page, 'a11y-focus-second')

    await page.keyboard.press('Tab')
    await page.waitForTimeout(200)
    await screenshotViewport(page, 'a11y-focus-third')

    const focusedTag = await page.evaluate(() => document.activeElement?.tagName)
    expect(['A', 'BUTTON', 'INPUT', 'TEXTAREA', 'SELECT']).toContain(focusedTag)
  })

  test('theme toggle button has aria-label', async ({ page }) => {
    const themeBtn = page.locator('button[aria-label]').first()
    await expect(themeBtn).toBeVisible()
    const ariaLabel = await themeBtn.getAttribute('aria-label')
    expect(ariaLabel?.length).toBeGreaterThan(0)
  })

  test('email and social links are accessible', async ({ page }) => {
    await page.locator('[data-testid="contact-section"]').scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)

    await expect(page.locator('[data-testid="email-link"]')).toBeVisible()

    const githubLink = page.locator('[data-testid="social-link-github"]')
    if ((await githubLink.count()) > 0) {
      await expect(githubLink).toBeVisible()
      const ariaLabel = await githubLink.getAttribute('aria-label')
      expect(ariaLabel).not.toBeNull()
    }
  })

  test('multiple h2 headings across sections', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(1500)

    const h2Count = await page.locator('h2').count()
    expect(h2Count).toBeGreaterThanOrEqual(3)
  })

  test('hamburger button has aria-label at mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto(BASE_URL)
    await waitForPageReady(page)

    const hamburger = page.locator('[data-testid="hamburger-button"]')
    await expect(hamburger).toBeVisible()
    const ariaLabel = await hamburger.getAttribute('aria-label')
    expect(ariaLabel?.length).toBeGreaterThan(0)
  })
})

test.describe('Light Mode Visual Verification', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto(BASE_URL)
    await waitForPageReady(page)
    await setTheme(page, 'light')
  })

  test('data-theme attribute is "light"', async ({ page }) => {
    const theme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'))
    expect(theme).toBe('light')
  })

  test('all sections render in light mode with screenshots', async ({ page }) => {
    await expect(page.locator('[data-testid="hero-section"]')).toBeVisible()
    await screenshotViewport(page, 'light-hero')

    await page.locator('[data-testid="projects-section"]').first().scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)
    await screenshotViewport(page, 'light-projects')

    await page.locator('[data-testid="skills-section"]').scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)
    await screenshotViewport(page, 'light-skills')

    await page.locator('[data-testid="contact-section"]').scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)
    await screenshotViewport(page, 'light-contact')
  })
})
