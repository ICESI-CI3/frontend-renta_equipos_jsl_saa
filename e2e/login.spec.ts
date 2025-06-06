import { test, expect } from '@playwright/test';

const VALID_EMAIL = 'samuel@gmail.com';
const VALID_PASSWORD = 'Freddyedd21';
const INVALID_EMAIL = 'invalido@prueba.com';
const INVALID_PASSWORD = 'incorrecta';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

test.describe('Login Page E2E', () => {
  test('Renderiza correctamente el formulario de login', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);
    await expect(page.getByText('Bienvenido')).toBeVisible();
    await expect(page.getByText('Inicia sesión en tu cuenta')).toBeVisible();
    await expect(page.getByRole('button', { name: /Iniciar Sesión/i })).toBeVisible();
  });

  test('Muestra error con credenciales inválidas', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);
    await page.getByPlaceholder('Ingresa tu email').fill(INVALID_EMAIL);
    await page.getByPlaceholder('Ingresa tu contraseña').fill(INVALID_PASSWORD);
    await page.getByRole('button', { name: /Iniciar Sesión/i }).click();
    await expect(
      page.locator('text=/error|incorrect|inválido|credenciales/i')
    ).toBeVisible({ timeout: 7000 });
  });

  test('Redirige al dashboard con credenciales válidas', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);
    await page.getByPlaceholder('Ingresa tu email').fill(VALID_EMAIL);
    await page.getByPlaceholder('Ingresa tu contraseña').fill(VALID_PASSWORD);
    await page.getByRole('button', { name: /Iniciar Sesión/i }).click();
    await page.waitForURL('**/dashboard', { timeout: 35000 });
    await expect(page).toHaveURL(/.*\/dashboard/);
  });

  test('Enlace a registro funciona', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);
    await page.getByRole('link', { name: /Regístrate aquí/i }).click();
    await page.waitForURL('**/register');
    await expect(page).toHaveURL(/.*\/register/);
  });
});
