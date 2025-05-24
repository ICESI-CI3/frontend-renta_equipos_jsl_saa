"use client";

import React, { useState } from 'react';
import { createDevice } from '../../services/deviceService';
import styles from './registerDevice.module.css';

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
    } catch (error: any) {
      setMessage(error?.response?.data?.message || 'Error al crear el dispositivo');
    } finally {
      setLoading(false);
    }
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
          <label className={styles.registerDeviceLabel}>Imagen (URL):</label>
          <input type="text" name="image" value={form.image} onChange={handleChange} required className={styles.registerDeviceInput} />
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

export default CreateDevicePage;
