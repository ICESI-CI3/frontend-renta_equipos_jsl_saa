// src/app/page.tsx
import styles from './home.module.css';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.homeLinks}>
        <Link className={styles.homeLink} href="/login">Login</Link>
        <Link className={styles.homeLink} href="/register">Registro</Link>
      </div>
    </div>
  );
}
