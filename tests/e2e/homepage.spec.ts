import { expect, test } from '@playwright/test';

test('homepage presents Amira observatory landing', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: /software engineer/i })).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Primary navigation' })).toBeVisible();
  await expect(page.getByRole('link', { name: /enter the observatory/i })).toBeVisible();
});
