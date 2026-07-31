import { expect, test } from '@playwright/test';

test('homepage presents Amira observatory landing', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: /i build software that feels quiet/i })).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Primary navigation' })).toBeVisible();
  await expect(page.getByRole('link', { name: /view selected work/i })).toBeVisible();
});
