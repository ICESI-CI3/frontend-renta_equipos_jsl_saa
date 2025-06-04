// src/app/layout.tsx
import './globals.css'; // Si tienes estilos globales
import React, { ReactNode } from 'react';
import MainNav from '../components/ui/MainNav';

export const metadata = {
  title: 'Alquiler',
  description: 'Aplicación con Next.js 13+',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body style={{ 
        background: '#f3f4f6', 
        minHeight: '100vh', 
        margin: 0,
        display: 'flex',
        flexDirection: 'column'
      }}>
      <header style={{ 
        background: '#6366f1', 
        padding: '18px 0', 
        marginBottom: 32, 
        boxShadow: '0 2px 8px rgba(99,102,241,0.08)' 
        }}>
        <nav style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: 32 
          }}>
          <MainNav/>
        </nav>
      </header>
      <main style={{ 
        flex: '1', 
        maxWidth: 900, 
        margin: '0 auto', 
        padding: 24,
        width: '100%'
      }}>{children}</main>
      <footer style={{ 
        textAlign: 'center', 
        padding: 18, 
        background: '#6366f1', 
        color: '#fff', 
        marginTop: 'auto'
      }}>
        © 2025 Mi App
      </footer>
      </body>
    </html>
  );
}
