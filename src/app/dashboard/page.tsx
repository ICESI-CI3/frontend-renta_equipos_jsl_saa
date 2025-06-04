"use client";

import React from 'react';
import styles from '../home.module.css';
import { DashboardLinks, ProtectedRoute } from '@/components';
import { useAuth } from '@/hooks';

function DashboardPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className={styles.homeContainer}>
        <h1 className={styles.homeTitle}>
          ¡Bienvenido {user?.email}! 👋
        </h1>
        <p className={styles.homeDescription}>
          Panel de Dispositivos - Rol: <strong>{user?.role}</strong>
        </p>
        <p className={styles.homeDescription}>
          Aquí puedes ver la lista de dispositivos registrados y crear uno nuevo.
        </p>
        <DashboardLinks />
      </div>
    </ProtectedRoute>
  );
}

export default DashboardPage;
