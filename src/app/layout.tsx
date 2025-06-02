// src/app/layout.tsx
import './globals.css'; // Si tienes estilos globales
import { ReactNode } from 'react';
import MainNav from '../components/ui/MainNav';

export const metadata = {
  title: 'Mi App',
  description: 'Aplicación con Next.js 13+',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body style={{ background: '#f3f4f6', minHeight: '100vh', margin: 0 }}>
        <header style={{ background: '#6366f1', padding: '18px 0', marginBottom: 32, boxShadow: '0 2px 8px rgba(99,102,241,0.08)' }}>
          <MainNav />
        </header>
        <main style={{ minHeight: '70vh', maxWidth: 900, margin: '0 auto', padding: 24 }}>{children}</main>
        <footer style={{ textAlign: 'center', padding: 18, background: '#6366f1', color: '#fff', marginTop: 32, borderRadius: '0 0 16px 16px' }}>
          © 2025 Mi App
        </footer>
      </body>
    </html>
  );
}
