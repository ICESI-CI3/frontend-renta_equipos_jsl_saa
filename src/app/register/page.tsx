'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register } from '@/services';
import styles from './register.module.css';
import { RegisterForm, Card, RegisterFormData } from '@/components';

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleRegister = async (formData: RegisterFormData) => {
    setIsLoading(true);
    setError('');

    try {
      // Map RegisterFormData to the expected API format
      await register({ 
        name: formData.username, 
        email: formData.email, 
        password: formData.password, 
        cellphone: formData.phone, 
        address: formData.address 
      });
      alert('Registro exitoso'); 
      router.push('/login');
    } catch (error) {
      console.error('Error al registrarse:', error);
      setError('Error al registrarse. Por favor, intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <h1 className={styles.registerTitle}>Registro</h1>
      <div className={styles.content}>
        <Card 
          title="Crear cuenta"
          subtitle="Regístrate para acceder a la plataforma"
        >
          {error && (
            <div className={styles.errorAlert}>
              <span className={styles.errorIcon}>⚠️</span>
              {error}
            </div>
          )}
          
          <RegisterForm 
            onSubmit={handleRegister} 
            isLoading={isLoading}
            error={error}
          />
          
          <div className={styles.footer}>
            <p className={styles.footerText}>
              ¿Ya tienes cuenta? <a href="/login" className={styles.link}>Inicia sesión aquí</a>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
