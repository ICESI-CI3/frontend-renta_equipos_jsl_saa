'use client';

import { useState, FormEvent } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import styles from './style/Form.module.css';


export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  address: string;
}

export interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => void;
  isLoading?: boolean;
  error?: string;
}

export default function RegisterForm({ onSubmit, isLoading = false, error }: RegisterFormProps) {
    
    const [formData, setFormData] = useState<RegisterFormData>({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        address: ''
    });

    const handleChange = (field: keyof RegisterFormData) => (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFormData(prev => ({
          ...prev,
          [field]: e.target.value
        }));
    };

    return (
        <form>
            <Input
                type="text"
                placeholder="Nombre de usuario"
                value={formData.username}
                onChange={handleChange('username')}
                showPasswordToggle={false}
            />
            <Input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange('email')}
                showPasswordToggle={false}
            />
            <Input
                type="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange('password')}
                showPasswordToggle={true}
            />
            <Input
                type="password"
                placeholder="Confirmar contraseña"
                value={formData.confirmPassword}
                onChange={handleChange('confirmPassword')}
                showPasswordToggle={true}
            />
            <Input
                type="text"
                placeholder="Teléfono"
                value={formData.phone}
                onChange={handleChange('phone')}
                showPasswordToggle={false}
            />
            <Input
                type="text"
                placeholder="Dirección"
                value={formData.address}
                onChange={handleChange('address')}
                showPasswordToggle={false}
            />
            {error && <div className="error-message">{error}</div>}
            <Button 
                type="submit" 
                size="large" 
                isLoading={isLoading}
                className={styles.submitButton}
            >
                Registrarse
            </Button>
        </form>
    )
}