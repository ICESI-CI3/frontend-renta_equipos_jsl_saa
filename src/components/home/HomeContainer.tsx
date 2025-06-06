// src/components/home/HomeContainer.tsx
import React from 'react';
import { ReactNode } from 'react';
import styles from '../../app/home.module.css';

interface HomeContainerProps {
  children: ReactNode;
}

export default function HomeContainer({ children }: HomeContainerProps) {
  return (
    <div className={styles.homeContainer}>
      {children}
    </div>
  );
}
