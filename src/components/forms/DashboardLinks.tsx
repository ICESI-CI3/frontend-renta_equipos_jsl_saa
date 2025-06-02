import styles from '../../app/home.module.css';
import Link from 'next/link';
import React from 'react';

const DashboardLinks: React.FC = () => (
  <>
    <div className={styles.homeLinks}>
      <Link className={styles.homeLink} href="/listDevice">Ver Lista de Dispositivos</Link>
    </div>
    <div style={{ marginTop: 32 }}>
      <Link className={styles.homeLink} href="/registerDevice">Crear Nuevo Dispositivo</Link>
    </div>
  </>
);

export default DashboardLinks;
