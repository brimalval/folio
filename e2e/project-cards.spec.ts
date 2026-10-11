import { test, expect } from 'playwright/test'

test.describe('Project cards QA', () => {
  test('homepage shows 4 featured cards', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByTestId('project-card-0')).toBeVisible()
    await expect(page.getByTestId('project-card-1')).toBeVisible()
    await expect(page.getByTestId('project-card-2')).toBeVisible()
    await expect(page.getByTestId('project-card-3')).toBeVisible()
  })

  test('bunpro-mcp is visible on homepage via project modal', async ({ page }) => {
    await page.goto('/')

    const detail = page.getByTestId('project-detail')
    const bunproTitle = detail.getByRole('heading', { name: 'Bunpro MCP Server' })

    for (const i of [0, 1, 2, 3]) {
      await page.getByTestId(`project-card-${i}`).click()
      await expect(detail).toBeVisible()

      if (await bunproTitle.isVisible()) {
        await expect(bunproTitle).toBeVisible()
        return
      }

      await page.keyboard.press('Escape')
      await expect(detail).not.toBeVisible()
    }

    throw new Error('Could not find Bunpro MCP Server in featured project modals')
  })

  test('bunpro featured card shows GitHub link without opening modal', async ({ page }) => {
    await page.goto('/')

    const bunproCard = page.getByTestId('project-card-3')
    const githubLink = bunproCard.getByRole('link', { name: 'View on GitHub' })
    const detail = page.getByTestId('project-detail')

    await expect(githubLink).toBeVisible()
    await expect(githubLink).toHaveAttribute('href', 'https://github.com/brimalval/bunpro-mcp')
    await expect(githubLink).toHaveAttribute('target', '_blank')

    const [popup] = await Promise.all([page.waitForEvent('popup'), githubLink.click()])
    await expect(popup).toHaveURL(/github\.com\/brimalval\/bunpro-mcp/)

    await expect(detail).not.toBeVisible()
  })

  test('mobile 375: every card reveals and the page has no horizontal overflow', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')

    for (const i of [0, 1, 2, 3]) {
      const card = page.getByTestId(`project-card-${i}`)
      await card.scrollIntoViewIfNeeded()
      await expect(card).toHaveCSS('opacity', '1')
    }

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    )
    expect(overflow).toBeLessThanOrEqual(0)
  })

  test('keyboard: Enter opens the dialog, focus moves in, Escape returns focus', async ({ page }) => {
    await page.goto('/')

    const trigger = page
      .getByTestId('project-card-0')
      .getByRole('button', { name: /view details/i })
    const dialog = page.getByRole('dialog')

    await trigger.focus()
    await page.keyboard.press('Enter')

    await expect(dialog).toBeVisible()
    await expect(dialog).toHaveAttribute('aria-modal', 'true')
    await expect(dialog).toBeFocused()

    // Focus stays inside the dialog while tabbing.
    for (let n = 0; n < 5; n++) {
      await page.keyboard.press('Tab')
      const inside = await dialog.evaluate((el) => el.contains(document.activeElement))
      expect(inside).toBe(true)
    }

    await page.keyboard.press('Escape')
    await expect(dialog).not.toBeVisible()
    await expect(trigger).toBeFocused()
  })
})

