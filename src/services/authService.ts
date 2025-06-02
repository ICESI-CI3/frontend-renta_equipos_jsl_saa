// src/services/authService.ts
import { LoginData } from '@/types/user';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
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

// Legacy function - remove if not used elsewhere
const handleLogin = async (credentials : LoginData) => {
  const data = await login(credentials);
  if (data && data.token) {
    localStorage.setItem('token', data.access_token);
    // Note: email and role are now obtained from JWT token, not stored separately
  }
}

// Legacy logout function - now only clears token (email/role come from JWT)
export const logout = () => {
  localStorage.removeItem('token');
  // Remove these legacy values if they exist
  localStorage.removeItem('email');
  localStorage.removeItem('role');
};

export const getRoleByEmail = async (data: String) => {
  if (!data) throw new Error("Email not found in localStorage");
  
  const response = await api.get(`/api/v1/auth/email-role/${data}`);
  return response.data;
}

export default api;

