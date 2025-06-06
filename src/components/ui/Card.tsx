import React, { ReactNode } from 'react';
import styles from './style/Card.module.css';

interface CardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function Card({ children, title, subtitle, className = '' }: CardProps) {
  return (
    <div className={`${styles.card} ${className}`}>
      {(title || subtitle) && (
        <div className={styles.header}>
          {title && <h2 className={styles.title}>{title}</h2>}
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
      )}
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}