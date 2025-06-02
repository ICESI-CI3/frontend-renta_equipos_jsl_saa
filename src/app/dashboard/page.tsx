import styles from '../home.module.css';
import DashboardLinks from '../../components/forms/DashboardLinks';
import withAuth from '../withAuth';

function DashboardPage() {
  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.homeTitle}>Panel de Dispositivos</h1>
      <p className={styles.homeDescription}>Aquí puedes ver la lista de dispositivos registrados y crear uno nuevo.</p>
      <DashboardLinks />
    </div>
  );
}

const ProtectedDashboardPage = withAuth(DashboardPage);
export default ProtectedDashboardPage;
