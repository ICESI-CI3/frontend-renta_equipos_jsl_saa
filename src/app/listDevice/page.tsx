// src/app/test/page.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAllDevices, getDeviceByName } from '../../services/deviceService'; // Asegúrate de que la ruta sea correcta
import styles from './listDevice.module.css';
import Link from 'next/link';
import withAuth from '../withAuth';

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
        <button
          className={styles.listDeviceButton}
          style={{
            background: 'linear-gradient(90deg, #6366f1 0%, #60a5fa 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 50,
            padding: '12px 28px',
            fontSize: '1rem',
            fontWeight: 600,
            boxShadow: '0 2px 8px rgba(99,102,241,0.13)',
            cursor: 'pointer',
            transition: 'background 0.2s',
            zIndex: 1000
          }}
          onClick={()=>router.push('/welcome')}
        >
          Volver al inicio
        </button>
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
      <ul className={styles.deviceList}>
        {devices.map((device) => (
          <li className={styles.deviceItem} key={device.id}>
            <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
              {device.image && (
                <img src={device.image} alt={device.name} style={{width: 64, height: 64, objectFit: 'cover', borderRadius: 8, background: '#e5e7eb'}} />
              )}
              <div>
                <h2 style={{margin: 0, fontSize: '1.2rem', fontWeight: 600}}>{device.name}</h2>
                {device.description && <p style={{margin: '4px 0 0 0', color: '#6b7280'}}>{device.description}</p>}
                <div style={{fontSize: '0.97rem', color: '#4b5563', marginTop: 4}}>
                  {device.type && <span><b>Tipo:</b> {device.type} &nbsp;|&nbsp; </span>}
                  {device.status && <span><b>Estado:</b> {device.status} &nbsp;|&nbsp; </span>}
                  {device.owner && <span><b>Propietario:</b> {device.owner}</span>}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
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
    </div>
  );
};

const ProtectedListDevicePage = withAuth(TestPage);
export default ProtectedListDevicePage;
