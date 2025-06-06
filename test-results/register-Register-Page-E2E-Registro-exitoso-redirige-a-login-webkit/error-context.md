# Test info

- Name: Register Page E2E >> Registro exitoso redirige a login
- Location: C:\Users\CTecn\Desktop\frontend-renta_equipos_jsl_saa\e2e\register.spec.ts:27:7

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toHaveURL(expected)

Locator: locator(':root')
Expected pattern: /.*\/login/
Received string:  "http://localhost:3000/register"
Call log:
  - expect.toHaveURL with timeout 5000ms
  - waiting for locator(':root')
    8 × locator resolved to <html lang="es">…</html>
      - unexpected value "http://localhost:3000/register"

    at C:\Users\CTecn\Desktop\frontend-renta_equipos_jsl_saa\e2e\register.spec.ts:38:24
```

# Page snapshot

```yaml
- banner:
  - navigation:
    - navigation:
      - link "Inicio":
        - /url: /
      - link "Crear Dispositivo":
        - /url: /registerDevice
      - link "Lista de Dispositivos":
        - /url: /listDevice
      - link "Crear Solicitud":
        - /url: /createRequest
- main:
  - heading "Registro" [level=1]
  - heading "Crear cuenta" [level=2]
  - paragraph: Regístrate para acceder a la plataforma
  - textbox "Nombre de usuario"
  - textbox "Email": test1749183177728@mail.com
  - textbox "Contraseña": TestPassword123
  - button "Mostrar contraseña": 👁️‍🗨️
  - textbox "Confirmar contraseña": TestPassword123
  - button "Mostrar contraseña": 👁️‍🗨️
  - textbox "Teléfono": "1234567890"
  - textbox "Dirección": Calle Falsa 123
  - button "Registrarse"
  - paragraph:
    - text: ¿Ya tienes cuenta?
    - link "Inicia sesión aquí":
      - /url: /login
- contentinfo: © 2025 Mi App
- alert
- button "Open Next.js Dev Tools":
  - img
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | const BASE_URL = 'http://localhost:3000';
   4 | // const customOutputDir = 'test-results-register';
   5 | // test.describe.configure({ outputDir: customOutputDir });
   6 |
   7 | test.describe('Register Page E2E', () => {
   8 |   test('Renderiza correctamente el formulario de registro', async ({ page }) => {
   9 |     await page.goto(`${BASE_URL}/register`);
  10 |     await expect(page.getByText('Registro')).toBeVisible();
  11 |     await expect(page.getByText('Crear cuenta')).toBeVisible();
  12 |     await expect(page.getByRole('button', { name: /Registrarse|Crear cuenta/i })).toBeVisible();
  13 |   });
  14 |
  15 |   test('Muestra error si faltan campos requeridos', async ({ page }) => {
  16 |     await page.goto(`${BASE_URL}/register`);
  17 |     // Captura el alert del navegador
  18 |     page.once('dialog', async (dialog) => {
  19 |       expect(dialog.message()).toBe('Por favor, completa todos los campos requeridos.');
  20 |       await dialog.dismiss();
  21 |     });
  22 |     await page.getByRole('button', { name: /Registrarse|Crear cuenta/i }).click();
  23 |     // Espera breve para asegurar que el alert se muestre
  24 |     await page.waitForTimeout(500);
  25 |   });
  26 |
  27 |   test('Registro exitoso redirige a login', async ({ page }) => {
  28 |     await page.goto(`${BASE_URL}/register`);
  29 |     const uniqueEmail = `test${Date.now()}@mail.com`;
  30 |     await page.getByPlaceholder('Nombre de usuario').fill('TestUser');
  31 |     await page.getByPlaceholder('Email').fill(uniqueEmail);
  32 |     await page.getByPlaceholder('Contraseña').nth(0).fill('TestPassword123');
  33 |     await page.getByPlaceholder('Confirmar contraseña').fill('TestPassword123');
  34 |     await page.getByPlaceholder('Teléfono').fill('1234567890');
  35 |     await page.getByPlaceholder('Dirección').fill('Calle Falsa 123');
  36 |     await page.getByRole('button', { name: /Registrarse|Crear cuenta/i }).click();
  37 |     await page.waitForTimeout(1000); // Da tiempo a la alerta
> 38 |     await expect(page).toHaveURL(/.*\/login/);
     |                        ^ Error: Timed out 5000ms waiting for expect(locator).toHaveURL(expected)
  39 |   });
  40 |
  41 |   test('Enlace a login funciona', async ({ page }) => {
  42 |     await page.goto(`${BASE_URL}/register`);
  43 |     await page.getByRole('link', { name: /Inicia sesión aquí/i }).click();
  44 |     await expect(page).toHaveURL(/.*\/login/);
  45 |   });
  46 | });
  47 |
```