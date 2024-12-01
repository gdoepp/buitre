import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('/index.html');
  await page.getByLabel('select key name', { exact: true }).locator('div').first().click();
  await page.getByText('default_rsa').click();
  await page.locator('input[name="cl1"]').click();
  await page.locator('input[name="cl1"]').fill('testuser');
  await page.locator('input[name="cl1"]').press('Tab');
  await page.locator('input[name="cl2"]').fill('testapp');
  await page.locator('input[name="cl2"]').press('Tab');
  await page.locator('input[name="cl3"]').fill('myca');
  await page.locator('input[name="cl3"]').press('Tab');
  await page.locator('input[name="cl4"]').fill('2024-11-13');
  await page.locator('input[name="cl5"]').fill('2024-11-29');
  await page.locator('input[name="cln"]').click();
  await page.locator('input[name="cln"]').fill('testclaim');
  await page.getByRole('button', { name: 'add claim' }).click();
  await page.getByRole('row', { name: 'testclaim' }).getByRole('textbox').click();
  await page.getByRole('row', { name: 'testclaim' }).getByRole('textbox').fill('testcontent');
  await page.getByRole('button', { name: 'create token with claims' }).click();
  await page.locator('textarea[name="tokenstring"]').click();
  await page.locator('textarea[name="tokenstring"]').press('ControlOrMeta+a');
  await page.locator('textarea[name="tokenstring"]').press('ControlOrMeta+c');
  await page.getByRole('tab', { name: 'Check Token' }).click();
  await page.locator('textarea[name="tokenstring"]').click();
  await page.locator('textarea[name="tokenstring"]').fill('eyJhbGciOiJSUzUxMiJ9.eyJzdWIiOiJ0ZXN0dXNlciIsImF1ZCI6WyJ0ZXN0YXBwIl0sImV4cCI6MTczMjgzODQwMCwiaWF0IjoxNzMxODQxNjUwLCJpc3MiOiJteWNhIiwibmJmIjoxNzMxNDU2MDAwLCJ0ZXN0Y2xhaW0iOiJ0ZXN0Y29udGVudCIsImp0aSI6IjZhODU2Zjg2LTg1NzItNDg4OS04ZTc4LWEzZmIzM2Y4ZWRhZiJ9.SMEGqiSmWWlW4JU2izXp1jryOu9VK5a1BoqNwaSs2y_Z9tZTByoLdaF0-GZgbpmzLzYWyHoH7QnWZlJRlYvprOdvl8KsulKHHDMbP86uhrVW5pnXKUXBamDEPEYjjbtSZu78GcoW9dxEzwto_VVw3SOvY42VoUFrT13cU1TYiu1lknKcOun-X1ehOgj8XI9bxrncx53iPjMyPEVi0iw75rTFA3zEoeFonLV8x1kXIz-zuKTVJhwuycZYzV0agKy7tdPy7OSWkMf5-pVjvXUKie2TGuZSvDIxHmZZqs4MRRQ3_ESgZDeoslMNXAcKfzC3fkxOwu7GBHs5uRvJmp5tt7JlENuMDaUMl3ZX5RYRQ4CucP4LNrXu4SAh2RZ-U8HlXU6JmzmMbxFjQ480ULKeZaBIZBS3PFJAn-byZtJu80W0PkSj44n1x9OZIezNnE3oBmCHUSzfZy_ggBf8PA9njY1AnoMy3KugU5CX6HK_GQxcwjpXyoaEUfGpOIzf4EIX2Dr4EZcD1sJ0Lpqe2c_C5GSqqdpOK8JTGPuo-tI1fnKRZbvhXmAb_7fiS80UEHEWcvhb-hw91dL5ng951DI248TpFYOEyEWcDrwawLZZEvEHySZdl4yJgipjpuF-Rr3z1pXEpEeQFGdM1kYtdneZZULFLhrtcHKKjcfNY3mP3xc');
  await page.getByLabel('select key name', { exact: true }).locator('div').first().click();
  await page.getByText('default_rsa').click();
  await page.getByRole('button', { name: 'check token' }).click();
  await page.locator('textarea[name="reason"]').click({
    button: 'right'
  });
  await page.locator('textarea[name="reason"]').click();
  await page.locator('textarea[name="reason"]').click();
  await page.locator('textarea[name="reason"]').click({
    button: 'right'
  });
  //await expect(page.locator('textarea[name="reason"]')).toContainText('{sub=testuser, aud=[testapp], exp=1732838400, iat=1731841650, iss=myca, nbf=1731456000, testclaim=testcontent,');
});