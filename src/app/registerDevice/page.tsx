"use client";

import React, { useState } from 'react';
import { createDevice } from '../../services/deviceService';

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
    <div style={{ maxWidth: 500, margin: '0 auto', padding: 24 }}>
      <h1>Crear Dispositivo</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>Nombre:</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} required style={{ width: '100%', padding: 8 }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Descripción:</label>
          <input type="text" name="description" value={form.description} onChange={handleChange} required style={{ width: '100%', padding: 8 }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Tipo:</label>
          <input type="text" name="type" value={form.type} onChange={handleChange} required style={{ width: '100%', padding: 8 }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Estado:</label>
          <input type="text" name="status" value={form.status} onChange={handleChange} required style={{ width: '100%', padding: 8 }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Propietario:</label>
          <input type="text" name="owner" value={form.owner} onChange={handleChange} required style={{ width: '100%', padding: 8 }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Imagen (URL):</label>
          <input type="text" name="image" value={form.image} onChange={handleChange} required style={{ width: '100%', padding: 8 }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Stock:</label>
          <input type="number" name="stock" value={stock} min={1} onChange={e => setStock(Number(e.target.value))} required style={{ width: '100%', padding: 8 }} />
        </div>
        <button type="submit" disabled={loading} style={{ padding: 10, width: '100%' }}>
          {loading ? 'Creando...' : 'Crear Dispositivo'}
        </button>
      </form>
      {message && <div style={{ marginTop: 16 }}>{message}</div>}
    </div>
  );
};

export default CreateDevicePage;
