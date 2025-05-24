// src/services/authService.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL, // Usa la variable de entorno
  headers: {
    'Content-Type': 'application/json',
  },
});




export const register = async (data: any) => {
  const response = await api.post('/api/v1/auth/register', data);
  return response.data;
}


export const login = async (data: any) => {
  const response = await api.post('/api/v1/auth/login', data);
  return response.data;
}



export default api;

