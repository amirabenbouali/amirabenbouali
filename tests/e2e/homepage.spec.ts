import { expect, test } from '@playwright/test';

test('homepage presents the dream opening', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Amira Benbouali lucid portfolio foundation' })).toBeAttached();
  await expect(page.getByRole('heading', { name: 'Selected work' })).toBeAttached();
  await expect(page.getByText('A calm planning environment exploring how calendars can feel clearer and less crowded.')).toBeAttached();
});
