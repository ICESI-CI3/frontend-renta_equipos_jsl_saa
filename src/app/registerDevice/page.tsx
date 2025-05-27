"use client";

import React, { useState, useRef } from 'react';
import { createDevice } from '../../services/deviceService';
import { useRouter } from 'next/navigation';
import styles from './registerDevice.module.css';
import withAuth from '../withAuth';

const initialState = {
  name: '',
  description: '',
  type: '',
  status: '',
  owner: '',
  image: '',
};

const CreateDevicePage = () => {
  const [form, setForm] = useState(initialState);
  const [stock, setStock] = useState(1);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await createDevice(stock, form);
      setMessage('Dispositivo creado exitosamente');
      setForm(initialState);
      setStock(1);
      router.push('/listDevice');
    } catch (error: any) {
      setMessage(error?.response?.data?.message || 'Error al crear el dispositivo');
    } finally {
      setLoading(false);
    }
  };

  const handleImageDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setForm({ ...form, image: url });
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setForm({ ...form, image: url });
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={styles.registerDeviceContainer}>
      <h1 className={styles.registerDeviceTitle}>Crear Dispositivo</h1>
      <form className={styles.registerDeviceForm} onSubmit={handleSubmit}>
        <div>
          <label className={styles.registerDeviceLabel}>Nombre:</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} required className={styles.registerDeviceInput} />
        </div>
        <div>
          <label className={styles.registerDeviceLabel}>Descripción:</label>
          <input type="text" name="description" value={form.description} onChange={handleChange} required className={styles.registerDeviceInput} />
        </div>
        <div>
          <label className={styles.registerDeviceLabel}>Tipo:</label>
          <input type="text" name="type" value={form.type} onChange={handleChange} required className={styles.registerDeviceInput} />
        </div>
        <div>
          <label className={styles.registerDeviceLabel}>Estado:</label>
          <input type="text" name="status" value={form.status} onChange={handleChange} required className={styles.registerDeviceInput} />
        </div>
        <div>
          <label className={styles.registerDeviceLabel}>Propietario:</label>
          <input type="text" name="owner" value={form.owner} onChange={handleChange} required className={styles.registerDeviceInput} />
        </div>
        <div>
          <label className={styles.registerDeviceLabel}>Imagen (URL o archivo):</label>
          <div
            style={{
              border: dragActive ? '2px solid #6366f1' : '2px dashed #d1d5db',
              borderRadius: 8,
              padding: 16,
              textAlign: 'center',
              background: dragActive ? '#e0e7ff' : '#f9fafb',
              marginBottom: 12,
              cursor: 'pointer',
              transition: 'background 0.2s, border 0.2s',
            }}
            onDrop={handleImageDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={handleBrowseClick}
          >
            {form.image ? (
              <img src={form.image} alt="Imagen del dispositivo" style={{ maxWidth: 120, maxHeight: 120, margin: '0 auto', borderRadius: 8, display: 'block' }} />
            ) : (
              <span>Arrastra una imagen aquí o haz clic para buscar en tu equipo</span>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageSelect}
            />
          </div>
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="URL de la imagen (opcional)"
            className={styles.registerDeviceInput}
            style={{ marginTop: 8 }}
          />
        </div>
        <div>
          <label className={styles.registerDeviceLabel}>Stock:</label>
          <input type="number" name="stock" value={stock} min={1} onChange={e => setStock(Number(e.target.value))} required className={styles.registerDeviceInput} />
        </div>
        <button type="submit" disabled={loading} className={styles.registerDeviceButton}>
          {loading ? 'Creando...' : 'Crear Dispositivo'}
        </button>
      </form>
      {message && <div className={styles.registerDeviceMessage}>{message}</div>}
    </div>
  );
};

const ProtectedRegisterDevicePage = withAuth(CreateDevicePage);
export default ProtectedRegisterDevicePage;
