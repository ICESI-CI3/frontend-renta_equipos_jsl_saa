import styles from '../home.module.css';
import Link from 'next/link';

export default function WelcomePage() {
  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.homeTitle}>Bienvenido a la aplicacion</h1>
      <p className={styles.homeDescription}></p>
      <div className={styles.homeLinks}>
        <Link className={styles.homeLink} href="/listDevice">Lista de equipos</Link>
      </div>
    </div>
  );
}
