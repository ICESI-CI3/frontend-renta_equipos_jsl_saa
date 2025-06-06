'use client';

import React, { useState, FormEvent } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import styles from './style/Form.module.css';
import { LoginFormData } from '@/types/auth';


interface FormErrors {
  email?: string;
  password?: string;
}

interface LoginFormProps {
  onSubmit: (formData: LoginFormData) => void | Promise<void>;
  isLoading?: boolean;
}

export default function LoginForm({ onSubmit, isLoading = false }: LoginFormProps) {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }
    
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    }
    
    return newErrors;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const newErrors = validateForm();
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    }
  };

  const handleChange = (field: keyof LoginFormData) => (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Input
        type="email"
        placeholder="Ingresa tu email"
        value={formData.email}
        onChange={handleChange('email')}
        error={errors.email}
        autoComplete="email"
      />
      
      <Input
        type="password"
        placeholder="Ingresa tu contraseña"
        value={formData.password}
        onChange={handleChange('password')}
        showPasswordToggle
        error={errors.password}
        autoComplete="current-password"
      />
      
      <Button 
        type="submit" 
        size="large" 
        isLoading={isLoading}
        className={styles.submitButton}
      >
        Iniciar Sesión
      </Button>
    </form>
  );
}