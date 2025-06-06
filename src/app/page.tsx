"use client";
import React from 'react';

// src/app/page.tsx
import { HomePage } from '../components/home';
import { useAuth } from '@/hooks/useAuth';

export default function HomePageRoute() {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '60vh' 
      }}>
        <p>Cargando...</p>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h1>¡Hola de nuevo, {user?.email}! 🎉</h1>
        <p style={{ fontSize: '18px', marginBottom: '30px' }}>
          Bienvenido de vuelta. Tu rol actual es: <strong>{user?.role}</strong>
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <a 
            href="/dashboard"
            style={{
              background: '#6366f1',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 'bold'
            }}
          >
            Ir al Dashboard
          </a>
          <a 
            href="/listDevice"
            style={{
              background: '#10b981',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 'bold'
            }}
          >
            Ver Dispositivos
          </a>
        </div>
      </div>
    );
  }

  return <HomePage />;
}
