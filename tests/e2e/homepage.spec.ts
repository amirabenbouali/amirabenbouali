import { expect, test } from '@playwright/test';

test('homepage presents the dream opening', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: /everything begins as an unfinished thought/i })).toBeAttached();
  await expect(page.getByRole('heading', { name: /Nothing is replaced. Everything transforms/i })).toBeAttached();
  await expect(page.getByText(/Atria: time becomes architecture/i)).toBeAttached();
});
