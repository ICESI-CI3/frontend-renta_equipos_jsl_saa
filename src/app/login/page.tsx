'use client';

import { JSX, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, LoginForm } from '@/components';
import styles from './login.module.css';
import { LoginFormData } from '@/types';
import { useAuth } from '@/hooks';

export default function LoginPage(): JSX.Element {
  const router = useRouter();
  const [error, setError] = useState<string>('');
  const { login, isLoading, isAuthenticated } = useAuth();  // Redirigir si ya está autenticado
  useEffect(() => {
    console.log('🔍 LOGIN PAGE: isAuthenticated changed to:', isAuthenticated);
    console.log('🔍 LOGIN PAGE: isLoading:', isLoading);
    
    // Only redirect if we're authenticated AND not loading
    if (isAuthenticated && !isLoading) {
      console.log('🔄 LOGIN PAGE: Redirecting to dashboard because isAuthenticated is true and not loading');
      router.push('/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);
  const handleLogin = async (formData: LoginFormData): Promise<void> => {
    setError('');
    
    const result = await login(formData);
    console.log('Login result:', result);
    
    if (result && result.success) {
      router.push('/dashboard');
    } else {
      setError(result?.error || 'Error al iniciar sesión');
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