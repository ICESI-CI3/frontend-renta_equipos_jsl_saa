# Test info

- Name: Login Page E2E >> Muestra error con credenciales inválidas
- Location: C:\Users\CTecn\Desktop\frontend-renta_equipos_jsl_saa\e2e\login.spec.ts:18:7

# Error details

```
Error: Timed out 7000ms waiting for expect(locator).toBeVisible()

Locator: locator('text=/error|incorrect|inválido|credenciales/i')
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 7000ms
  - waiting for locator('text=/error|incorrect|inválido|credenciales/i')

    at C:\Users\CTecn\Desktop\frontend-renta_equipos_jsl_saa\e2e\login.spec.ts:25:7
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
  - heading "Bienvenido" [level=2]
  - paragraph: Inicia sesión en tu cuenta
  - textbox "Ingresa tu email"
  - text: El email es requerido
  - textbox "Ingresa tu contraseña": incorrecta
  - button "Mostrar contraseña": 👁️‍🗨️
  - button "Iniciar Sesión"
  - paragraph:
    - text: ¿No tienes cuenta?
    - link "Regístrate aquí":
      - /url: /register
- contentinfo: © 2025 Mi App
- alert
- button "Open Next.js Dev Tools":
  - img
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | const VALID_EMAIL = 'samuel@gmail.com';
   4 | const VALID_PASSWORD = 'Freddyedd21';
   5 | const INVALID_EMAIL = 'invalido@prueba.com';
   6 | const INVALID_PASSWORD = 'incorrecta';
   7 |
   8 | const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
   9 |
  10 | test.describe('Login Page E2E', () => {
  11 |   test('Renderiza correctamente el formulario de login', async ({ page }) => {
  12 |     await page.goto(`${BASE_URL}/login`);
  13 |     await expect(page.getByText('Bienvenido')).toBeVisible();
  14 |     await expect(page.getByText('Inicia sesión en tu cuenta')).toBeVisible();
  15 |     await expect(page.getByRole('button', { name: /Iniciar Sesión/i })).toBeVisible();
  16 |   });
  17 |
  18 |   test('Muestra error con credenciales inválidas', async ({ page }) => {
  19 |     await page.goto(`${BASE_URL}/login`);
  20 |     await page.getByPlaceholder('Ingresa tu email').fill(INVALID_EMAIL);
  21 |     await page.getByPlaceholder('Ingresa tu contraseña').fill(INVALID_PASSWORD);
  22 |     await page.getByRole('button', { name: /Iniciar Sesión/i }).click();
  23 |     await expect(
  24 |       page.locator('text=/error|incorrect|inválido|credenciales/i')
> 25 |     ).toBeVisible({ timeout: 7000 });
     |       ^ Error: Timed out 7000ms waiting for expect(locator).toBeVisible()
  26 |   });
  27 |
  28 |   test('Redirige al dashboard con credenciales válidas', async ({ page }) => {
  29 |     await page.goto(`${BASE_URL}/login`);
  30 |     await page.getByPlaceholder('Ingresa tu email').fill(VALID_EMAIL);
  31 |     await page.getByPlaceholder('Ingresa tu contraseña').fill(VALID_PASSWORD);
  32 |     await page.getByRole('button', { name: /Iniciar Sesión/i }).click();
  33 |     await page.waitForURL('**/dashboard', { timeout: 35000 });
  34 |     await expect(page).toHaveURL(/.*\/dashboard/);
  35 |   });
  36 |
  37 |   test('Enlace a registro funciona', async ({ page }) => {
  38 |     await page.goto(`${BASE_URL}/login`);
  39 |     await page.getByRole('link', { name: /Regístrate aquí/i }).click();
  40 |     await page.waitForURL('**/register');
  41 |     await expect(page).toHaveURL(/.*\/register/);
  42 |   });
  43 | });
  44 |
```