import React from 'react';
import Link from 'next/link';
import styles from '../../app/home.module.css';

interface WelcomeLinksProps {
  role: string | null;
  loading: boolean;
}

const WelcomeLinks: React.FC<WelcomeLinksProps> = ({ role, loading }) => (
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
        <Link className={styles.homeLink} href="/myContracts">Mis contratos</Link>
      </>
    )}
    {/* Si no hay rol válido, mostrar mensaje */}
    {role !== 'admin' && role !== 'user' && !loading && (
      <p className={styles.homeDescription}>No tienes permisos para ver opciones.</p>
    )}
  </div>
);

export default WelcomeLinks;
