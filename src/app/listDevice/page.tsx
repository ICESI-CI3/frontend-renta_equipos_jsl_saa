// src/app/test/page.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAllDevices, getDeviceByName } from '../../services/deviceService'; // Asegúrate de que la ruta sea correcta
import { getRoleByEmail } from '../../services/authService';
import styles from './listDevice.module.css';
import Link from 'next/link';
import withAuth from '../withAuth';
import DeviceList from '../../components/forms/DeviceList';

interface Device {
  id: string;
  name: string;
  description?: string;
  type?: string;
  status?: string;
  owner?: string;
  image?: string;
  
  // Agrega más campos según tu modelo de dispositivo
}

const TestPage = () => {
  const router = useRouter();
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [searching, setSearching] = useState(false);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    // Obtener el rol del usuario
    const fetchRole = async () => {
      let emailValue = '';
      if (typeof window !== 'undefined') {
        emailValue = localStorage.getItem('user_email') || '';
      }
      if (!emailValue) {
        setRole(null);
        return;
      }
      try {
        const userRole = await getRoleByEmail(emailValue);
        setRole(userRole);
      } catch {
        setRole(null);
      }
    };
    fetchRole();
  }, []);

  useEffect(() => {
    const fetchDevices = async () => {
      setLoading(true);
      try {
        const devicesData = await getAllDevices();
        setDevices(devicesData);
      } catch (err: any) {
        setError('Error al obtener dispositivos');
      } finally {
        setLoading(false);
      }
    };
    fetchDevices();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setSearching(true);
    setError(null);
    try {
      if (search.trim() === '') {
        const devicesData = await getAllDevices();
        setDevices(devicesData);
      } else {
        const result = await getDeviceByName(search.trim());
        setDevices(Array.isArray(result) ? result : [result]);
      }
    } catch (err: any) {
      setError('No se encontraron dispositivos con ese nombre');
      setDevices([]);
    } finally {
      setSearching(false);
    }
  };

  if (loading) return <div>Cargando dispositivos...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.listDeviceContainer}>
      <div style={{display:'flex',justifyContent:'flex-end',gap:8,marginBottom:16}}>
        <button className={styles.listDeviceButton} onClick={()=>router.push('/welcome')}>Volver al inicio</button>
      </div>
      <form onSubmit={handleSearch} style={{ marginBottom: 24, display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'center' }}>
        <input
          className={styles.deviceSearchInput}
          type="text"
          placeholder="Buscar dispositivo por nombre..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button className={styles.deviceSearchButton} type="submit" disabled={searching}>
          {searching ? 'Buscando...' : 'Buscar'}
        </button>
      </form>
      <h1 className={styles.listTitle}>Lista de Dispositivos</h1>
      <DeviceList devices={devices} />
      {role === 'admin' && (
        <Link href="/registerDevice">
          <button
            style={{
              position: 'fixed',
              bottom: 32,
              right: 32,
              background: 'linear-gradient(90deg, #6366f1 0%, #60a5fa 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 50,
              padding: '18px 28px',
              fontSize: '1.1rem',
              fontWeight: 700,
              boxShadow: '0 4px 16px rgba(99,102,241,0.13)',
              cursor: 'pointer',
              zIndex: 1000
            }}
          >
            Crear Nuevo Device
          </button>
        </Link>
      )}
    </div>
  );
};

const ProtectedListDevicePage = withAuth(TestPage);
export default ProtectedListDevicePage;
