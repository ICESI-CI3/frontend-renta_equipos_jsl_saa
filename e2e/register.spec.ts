import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';
// const customOutputDir = 'test-results-register';
// test.describe.configure({ outputDir: customOutputDir });

test.describe('Register Page E2E', () => {
  test('Renderiza correctamente el formulario de registro', async ({ page }) => {
    await page.goto(`${BASE_URL}/register`);
    await expect(page.getByText('Registro')).toBeVisible();
    await expect(page.getByText('Crear cuenta')).toBeVisible();
    await expect(page.getByRole('button', { name: /Registrarse|Crear cuenta/i })).toBeVisible();
  });

  test('Muestra error si faltan campos requeridos', async ({ page }) => {
    await page.goto(`${BASE_URL}/register`);
    // Captura el alert del navegador
    page.once('dialog', async (dialog) => {
      expect(dialog.message()).toBe('Por favor, completa todos los campos requeridos.');
      await dialog.dismiss();
    });
    await page.getByRole('button', { name: /Registrarse|Crear cuenta/i }).click();
    // Espera breve para asegurar que el alert se muestre
    await page.waitForTimeout(500);
  });

  test('Registro exitoso redirige a login', async ({ page }) => {
    await page.goto(`${BASE_URL}/register`);
    const uniqueEmail = `test${Date.now()}@mail.com`;
    await page.getByPlaceholder('Nombre de usuario').fill('TestUser');
    await page.getByPlaceholder('Email').fill(uniqueEmail);
    await page.getByPlaceholder('Contraseña').nth(0).fill('TestPassword123');
    await page.getByPlaceholder('Confirmar contraseña').fill('TestPassword123');
    await page.getByPlaceholder('Teléfono').fill('1234567890');
    await page.getByPlaceholder('Dirección').fill('Calle Falsa 123');
    await page.getByRole('button', { name: /Registrarse|Crear cuenta/i }).click();
    await page.waitForTimeout(1000); // Da tiempo a la alerta
    await expect(page).toHaveURL(/.*\/login/);
  });

  test('Enlace a login funciona', async ({ page }) => {
    await page.goto(`${BASE_URL}/register`);
    await page.getByRole('link', { name: /Inicia sesión aquí/i }).click();
    await expect(page).toHaveURL(/.*\/login/);
  });
});
