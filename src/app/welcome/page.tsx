"use client";
import styles from '../home.module.css';
import Link from 'next/link';
import withAuth from '../withAuth';
import React from 'react';
import { getRoleByEmail } from "@/services/authService";

function WelcomePage() {
  // Obtener el rol del usuario desde el backend usando el email
  const [role, setRole] = React.useState<string | null>(null);
  const [email, setEmail] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchRole = async () => {
      let emailValue = '';
      if (typeof window !== 'undefined') {
        emailValue = localStorage.getItem('user_email') || '';
        setEmail(emailValue);
      }
      if (!emailValue) {
        setRole(null);
        setLoading(false);
        return;
      }
      try {
        const userRole = await getRoleByEmail(emailValue);
        setRole(userRole);
      } catch {
        setRole(null);
      } finally {
        setLoading(false);

      }
    };
    fetchRole();
  }, []);

  if (loading) {
    return (
      <div className={styles.homeContainer}>
        <h1 className={styles.homeTitle}>Bienvenido a la aplicacion</h1>
        <p className={styles.homeDescription}>Cargando opciones...</p>
      </div>
    );
  }

  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.homeTitle}>Bienvenido a la aplicacion</h1>
      <div className={styles.homeLinks}>
        {/* ADMIN VIEW */}
        {role === 'admin' && (
          <>
            <Link className={styles.homeLink} href="/registerDevice">Crear nuevo device</Link>
            <Link className={styles.homeLink} href="/listDevice">Ver todos los devices</Link>
            <Link className={styles.homeLink} href="/allRequests">Ver todas las requests</Link>
            <Link className={styles.homeLink} href="/allContracts">Ver todos los contratos</Link>
          </>
        )}
        {/* USER VIEW */}
        {role === 'user' && (
          <>
            <Link className={styles.homeLink} href="/listDevice">Lista de equipos</Link>
            <Link className={styles.homeLink} href="/myRequests">Mis solicitudes</Link>
            <Link className={styles.homeLink} href="/createRequest">Crear solicitud</Link>
          </>
        )}
        {/* Si no hay rol válido, mostrar mensaje */}
        {role !== 'admin' && role !== 'user' && !loading && (
          <p className={styles.homeDescription}>No tienes permisos para ver opciones.</p>
        )}
      </div>
    </div>
  );
}

const ProtectedWelcomePage = withAuth(WelcomePage);
export default ProtectedWelcomePage;
