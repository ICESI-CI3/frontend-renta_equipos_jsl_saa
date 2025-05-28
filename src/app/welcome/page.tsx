"use client";
import styles from '../home.module.css';
import Link from 'next/link';
import withAuth from '../withAuth';

function WelcomePage() {
  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.homeTitle}>Bienvenido a la aplicacion</h1>
      <p className={styles.homeDescription}></p>
      <div className={styles.homeLinks}>
        <Link className={styles.homeLink} href="/listDevice">Lista de equipos</Link>
        <Link className={styles.homeLink} href="/registerDevice">Registrar equipo</Link>
        <Link className={styles.homeLink} href="/createRequest">Crear solicitud</Link>
        <Link className={styles.homeLink} href="/myRequests">Mis Solicitudes</Link>
      </div>
    </div>
  );
}

const ProtectedWelcomePage = withAuth(WelcomePage);
export default ProtectedWelcomePage;
