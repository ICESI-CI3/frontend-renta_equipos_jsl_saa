import React from 'react';
import Link from 'next/link';

interface MainNavProps {}

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/registerDevice', label: 'Crear Dispositivo' },
  { href: '/listDevice', label: 'Lista de Dispositivos' },
  { href: '/createRequest', label: 'Crear Solicitud' },
];

const MainNav: React.FC<MainNavProps> = () => (
  <nav style={{ display: 'flex', justifyContent: 'center', gap: 32 }}>
    {navLinks.map(link => (
      <Link
        key={link.href}
        href={link.href}
        style={{ color: '#fff', fontWeight: 600, fontSize: '1.1rem', textDecoration: 'none' }}
      >
        {link.label}
      </Link>
    ))}
  </nav>
);

export default MainNav;
