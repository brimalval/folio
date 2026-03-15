import { test, expect } from 'playwright/test'

test.describe('Full flow QA', () => {
  test('navigates to projects and opens/closes project detail modal', async ({ page }) => {
    await page.goto('/')

    await page.getByRole('link', { name: 'All Projects' }).click()
    await page.waitForURL('**/projects')

    const projectDetail = page.getByTestId('project-detail')

    await page.getByTestId('project-card-0').click()
    await expect(projectDetail).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(projectDetail).not.toBeVisible()
  })
})
