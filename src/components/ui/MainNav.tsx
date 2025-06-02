"use client";
import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks';

interface MainNavProps {}

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/registerDevice', label: 'Crear Dispositivo' },
  { href: '/listDevice', label: 'Lista de Dispositivos' },
  { href: '/createRequest', label: 'Crear Solicitud' },
];

const MainNav: React.FC<MainNavProps> = () => {
  const { logout, user } = useAuth();

  const handleLogout = () => {
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      logout();
    }
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 32 }}>
      {navLinks.map(link => (
        <Link
          key={link.href}
          href={link.href}
          style={{ color: '#fff', fontWeight: 600, fontSize: '1.1rem', textDecoration: 'none' }}
        >
          {link.label}
        </Link>
      ))}
      {user && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginLeft: 16 }}>
          <span style={{ color: '#fff', fontSize: '0.9rem', opacity: 0.8 }}>
            {user.email}
          </span>
          <button
            onClick={handleLogout}
            style={{
              background: '#ef4444',
              color: '#fff',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              fontWeight: 600,
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = '#dc2626'}
            onMouseOut={(e) => e.currentTarget.style.background = '#ef4444'}
          >
            Cerrar Sesión
          </button>
        </div>
      )}
    </nav>
  );
};

export default MainNav;
