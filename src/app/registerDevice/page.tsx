"use client";

import React, { useState } from 'react';
import { createDevice } from '../../services/deviceService';
import { useRouter } from 'next/navigation';
import styles from './registerDevice.module.css';
import withAuth from '../withAuth';
import RegisterDeviceForm, { RegisterDeviceFormData } from '../../components/forms/RegisterDeviceForm';

const CreateDevicePage = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (data: RegisterDeviceFormData) => {
    setLoading(true);
    setMessage('');
    // Obtener email del usuario logeado
    let userEmail = '';
    if (typeof window !== 'undefined') {
      userEmail = localStorage.getItem('user_email') || '';
    }
    try {
      await createDevice(1, {
        ...data,
        status: 'Disponible', // siempre automático
        owner: userEmail, // email del usuario logeado
      });
      setMessage('Dispositivo creado exitosamente');
      setTimeout(() => router.push('/listDevice'), 1200);
    } catch (error: any) {
      setMessage(error?.response?.data?.message || 'Error al crear el dispositivo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.registerDeviceContainer}>
      <h1 className={styles.registerDeviceTitle}>Crear Dispositivo</h1>
      <RegisterDeviceForm onSubmit={handleSubmit} isLoading={loading} error={message && message.startsWith('Error') ? message : undefined} />
      {message && !message.startsWith('Error') && <div className={styles.registerDeviceMessage}>{message}</div>}
    </div>
  );
};

const ProtectedRegisterDevicePage = withAuth(CreateDevicePage);
export default ProtectedRegisterDevicePage;
