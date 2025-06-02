import axios from 'axios';
import { getToken } from '@/utils';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const register = async (data: any) => {
  const response = await api.post('/api/v1/auth/register', data);
  return response.data;
}

export const login = async (data: any) => {
  const response = await api.post('/api/v1/auth/login', data);
  return response.data;
}

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('email');
  localStorage.removeItem('role');
};

export const getRoleByEmail = async (data: String) => {
  if (!data) throw new Error("Email not found in localStorage");
  
  const response = await api.get(`/api/v1/auth/email-role/${data}`);
  return response.data;
}

export default api;

