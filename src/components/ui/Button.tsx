'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './style/Button.module.css';

type ButtonVariant = 'primary' | 'secondary';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  isLoading = false, 
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  ...props 
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${isLoading ? styles.loading : ''} ${className}`}
      onClick={onClick}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className={styles.spinner}>
          <span className={styles.spinnerIcon}>⚪</span>
          Cargando...
        </span>
      ) : (
        children
      )}
    </button>
  );
}