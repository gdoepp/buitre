import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('/index.html');
  await page.getByRole('tab', { name: 'Public Key sign and encrypt' }).click();
  await page.getByTestId('gpg-asym-key-1').getByLabel('select key name').locator('div').first().click();
  await page.locator('div.cdk-overlay-container').getByTestId('keyname_0').click();
  await page.locator('textarea[name="origtxt"]').click();
  await page.locator('textarea[name="origtxt"]').fill('Dies ist ein schöner kleiner Beispieltext.');
  await page.getByRole('button', { name: 'Encrypt Text' }).click();
  await page.getByTestId('gpg-asym-key-2').getByLabel('select key name').locator('div').first().click();
  await page.locator('div.cdk-overlay-container').getByTestId('keyname_0').click();
  await page.getByRole('button', { name: 'Decrypt Text' }).click();
  await expect(page.locator('textarea[name="dectext"]')).toHaveValue('Dies ist ein schöner kleiner Beispieltext.');
  await page.getByRole('button', { name: 'Sign Text' }).click();
  await page.getByRole('button', { name: 'Verify signature' }).click();
  await expect(page.getByTestId('gpg-asym-verify')).toContainText('valid');
  await page.locator('textarea[name="origtxt"]').click();
  await page.locator('textarea[name="origtxt"]').fill('Dies ist ein schöner kleiner Beispieltext,');
  await page.getByRole('button', { name: 'Verify signature' }).click();
  await expect(page.getByTestId('gpg-asym-verify')).toContainText('invalid');
});