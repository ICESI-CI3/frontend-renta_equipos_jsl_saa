'use client';

import { JSX, useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '../../services/authService';
import Card from '../../components/ui/Card';
import LoginForm from '../../components/forms/LoginForm';
import styles from './login.module.css';
import { LoginFormData } from '@/types/auth';

export default function LoginPage(): JSX.Element {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleLogin = async (formData: LoginFormData): Promise<void> => {
    setIsLoading(true);
    setError('');
    
    try {
      await login(formData);
      
      // Guardar el email del usuario en localStorage para usarlo en la app
      if (typeof window !== 'undefined') {
        localStorage.setItem('user_email', formData.email);
      }
      
      router.push('/welcome');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Credenciales incorrectas. Por favor, intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <div className={styles.shape}></div>
        <div className={styles.shape}></div>
      </div>
      
      <div className={styles.content}>
        <Card 
          title="Bienvenido"
          subtitle="Inicia sesión en tu cuenta"
        >
          {error && (
            <div className={styles.errorAlert}>
              <span className={styles.errorIcon}>⚠️</span>
              {error}
            </div>
          )}
          
          <LoginForm 
            onSubmit={handleLogin} 
            isLoading={isLoading}
          />
          
          <div className={styles.footer}>
            <p className={styles.footerText}>
              ¿No tienes cuenta? <a href="/register" className={styles.link}>Regístrate aquí</a>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}