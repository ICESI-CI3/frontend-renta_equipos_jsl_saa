import { useAuth } from '@/hooks';
import styles from '../../app/home.module.css';
import Link from 'next/link';
import React from 'react';

const DashboardLinks: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  return(
     <>
    <div className={styles.homeLinks}>
      <Link className={styles.homeLink} href="/listDevice">Ver Lista de Dispositivos</Link>
    </div>
    {isAdmin && (
      <>
      <div style={{ marginTop: 32 }}>
      <Link className={styles.homeLink} href="/registerDevice">Crear Nuevo Dispositivo</Link>
      </div>
      <div style={{ marginTop: 32 }}>
        <Link className={styles.homeLink} href="/allRequests">Lista de peticiones</Link>
      </div>
      <div style={{ marginTop: 32 }}>
        <Link className={styles.homeLink} href="/allContracts">Lista de contratos</Link>
      </div>
      </>
    )}
    { !isAdmin && (
      <>
        <div style={{ marginTop: 32 }}>
            <Link className={styles.homeLink} href="/myRequests">Mis peticiones</Link>
          </div>
          <div style={{ marginTop: 32 }}>
            <Link className={styles.homeLink} href="/myContracts">Mis contratos</Link>
          </div>
          <div style={{ marginTop: 32 }}>
            <Link className={styles.homeLink} href="/createRequest">Crear petición</Link>
          </div>

      </>
    )}
  </>
  )
 
};

export default DashboardLinks;
