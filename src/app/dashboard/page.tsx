import styles from '../home.module.css';
import Link from 'next/link';
import withAuth from '../withAuth';

function DashboardPage() {
  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.homeTitle}>Panel de Dispositivos</h1>
      <p className={styles.homeDescription}>Aquí puedes ver la lista de dispositivos registrados y crear uno nuevo.</p>
      <div className={styles.homeLinks}>
        <Link className={styles.homeLink} href="/listDevice">Ver Lista de Dispositivos</Link>
      </div>
      <div style={{ marginTop: 32 }}>
        <Link className={styles.homeLink} href="/registerDevice">Crear Nuevo Dispositivo</Link>
      </div>
    </div>
  );
}

const ProtectedDashboardPage = withAuth(DashboardPage);
export default ProtectedDashboardPage;
