import { expect, test } from 'playwright/test'
import projects from '../data/projects.json'

test.describe('/projects page QA', () => {
  test('renders heading, full project list, and 2-column desktop grid', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto('/projects')

    await expect(page.getByRole('heading', { name: 'All Projects' })).toBeVisible()

    const cards = page.locator('[data-testid^="project-card-"]')
    await expect(cards).toHaveCount(projects.length)

    const columnCount = await cards.first().evaluate((element) => {
      const parent = element.parentElement
      if (!parent) {
        return 0
      }

      return window
        .getComputedStyle(parent)
        .gridTemplateColumns
        .split(' ')
        .filter(Boolean).length
    })

    expect(columnCount).toBe(2)
  })

  test('bunpro card shows GitHub link without opening modal', async ({ page }) => {
    await page.goto('/projects')

    const bunproCard = page
      .locator('[data-testid^="project-card-"]')
      .filter({ hasText: 'Bunpro MCP Server' })
    const githubLink = bunproCard.getByRole('link', { name: 'View on GitHub' })
    const detail = page.getByTestId('project-detail')

    await expect(bunproCard).toHaveCount(1)
    await expect(githubLink).toBeVisible()
    await expect(githubLink).toHaveAttribute('href', 'https://github.com/brimalval/bunpro-mcp')
    await expect(githubLink).toHaveAttribute('target', '_blank')

    const [popup] = await Promise.all([page.waitForEvent('popup'), githubLink.click()])
    await expect(popup).toHaveURL(/github\.com\/brimalval\/bunpro-mcp/)

    await expect(detail).not.toBeVisible()
  })
})
