"use client";
import styles from '../home.module.css';
import React from 'react';
import { getRoleByEmail } from "@/services";
import withAuth from '../withAuth';
import { WelcomeLinks } from '@/components';
import { getUserEmailFromToken } from '../../utils/jwt';

function WelcomePage() {
  // Obtener el rol del usuario desde el backend usando el email
  const [role, setRole] = React.useState<string | null>(null);
  const [email, setEmail] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const fetchRole = async () => {
      const emailValue = getUserEmailFromToken();
      setEmail(emailValue);
      
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
      <WelcomeLinks role={role} loading={loading} />
    </div>
  );
}

const ProtectedWelcomePage = withAuth(WelcomePage);
export default ProtectedWelcomePage;
