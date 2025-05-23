// src/lib/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL, // Usa la variable de entorno
  headers: {
    'Content-Type': 'application/json',
  },
});

// Agrega función para obtener todos los dispositivos
export const getAllDevices = async () => {
  const response = await api.get('/api/v1/devices');
  return response.data;
};

export default api;
