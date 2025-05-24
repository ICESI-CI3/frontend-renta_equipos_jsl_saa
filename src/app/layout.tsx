// src/app/layout.tsx
import './globals.css'; // Si tienes estilos globales
import { ReactNode } from 'react';

export const metadata = {
  title: 'Mi App',
  description: 'Aplicación con Next.js 13+',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>
        <header>
          <nav>
            <a href="/">Inicio</a>
            <a href="/login">Login</a>
            <a href="/register">Registro</a>
            <a href="/test">Test</a>
          </nav>
        </header>
        <main>{children}</main>
        <footer>© 2025 Mi App</footer>
      </body>
    </html>
  );
}
