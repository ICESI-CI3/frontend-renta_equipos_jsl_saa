'use client';

import { useState, InputHTMLAttributes, ReactNode } from 'react';
import styles from './style/Input.module.css';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPasswordToggle?: boolean;
  icon?: ReactNode;
  error?: string;
}

export default function Input({ 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  showPasswordToggle = false,
  error,
  ...props 
}: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const togglePasswordVisibility = (): void => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const inputType = showPasswordToggle ? (isPasswordVisible ? 'text' : 'password') : type;

  return (
    <div className={styles.inputContainer}>
      <div className={styles.inputWrapper}>
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`${styles.input} ${error ? styles.error : ''} `}
          {...props}
        />
        {showPasswordToggle && (
          <button
            type="button"
            className={styles.toggleButton}
            onClick={togglePasswordVisibility}
            aria-label={isPasswordVisible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          >
            {isPasswordVisible ? '👁️' : '👁️‍🗨️'}
          </button>
        )}
      </div>
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
}