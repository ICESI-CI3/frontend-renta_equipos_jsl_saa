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

export const createDevice = async (stock: number, data: any) => {
  const response = await api.post(`/api/v1/devices/${stock}`, data);
  return response.data;
};

export const getDeviceByName = async (name: string) => {
  const response = await api.get(`/api/v1/devices/by-name/${name}`);
  return response.data;
};


export const getDeviceByStatus = async (status: string) => {
  const response = await api.get(`/api/v1/devices/by-status/${status}`);
  return response.data;
};

export default api;