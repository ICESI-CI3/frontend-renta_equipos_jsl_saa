// src/services/authService.ts
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});

export const register = async (data: any) => {
  const response = await api.post('/api/v1/auth/register', data);
  return response.data;
}

export const login = async (data: any) => {
  const response = await api.post('/api/v1/auth/login', data);
  return response.data;
}

export const getRoleByEmail = async (data: String) => {
  if (!data) throw new Error("Email not found in localStorage");
  
  const response = await api.get(`/api/v1/auth/email-role/${data}`);
  return response.data;
}

export default api;

