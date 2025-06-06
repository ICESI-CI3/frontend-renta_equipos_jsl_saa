'use client';

import { JSX } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Button } from '@/components';
import styles from './unauthorized.module.css';

export default function UnauthorizedPage(): JSX.Element {
  const router = useRouter();

  const handleGoBack = (): void => {
    router.back();
  };

  const handleGoHome = (): void => {
    router.push('/');
  };

  const handleLogin = (): void => {
    router.push('/login');
  };

  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <div className={styles.shape}></div>
        <div className={styles.shape}></div>
      </div>
      
      <div className={styles.content}>
        <Card 
          title="Acceso Denegado"
          subtitle="No tienes permisos para acceder a esta página"
        >
          <div className={styles.iconContainer}>
            <div className={styles.icon}>
              🚫
            </div>
          </div>
          
          <div className={styles.message}>
            <p className={styles.primaryMessage}>
              Lo sentimos, no tienes autorización para ver este contenido.
            </p>
            <p className={styles.secondaryMessage}>
              Esto puede deberse a que:
            </p>
            <ul className={styles.reasonsList}>
              <li>No has iniciado sesión</li>
              <li>Tu sesión ha expirado</li>
              <li>No tienes los permisos necesarios</li>
              <li>Intentas acceder a una página restringida</li>
            </ul>
          </div>

          <div className={styles.actions}>
            <Button 
              variant="primary" 
              onClick={handleLogin}
              className={styles.button}
            >
              Iniciar Sesión
            </Button>
            <Button 
              variant="secondary" 
              onClick={handleGoHome}
              className={styles.button}
            >
              Ir al Inicio
            </Button>
            <Button 
              variant="secondary" 
              onClick={handleGoBack}
              className={styles.button}
            >
              Volver Atrás
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}