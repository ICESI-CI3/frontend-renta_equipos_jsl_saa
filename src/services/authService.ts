// src/services/authService.ts
import api from '../lib/api';
import { User, RegisterData, LoginData } from '../types/user';

export const login = async (data: LoginData): Promise<User> => {
  const response = await api.post('api/v1/auth/login', data);
  return response.data;
};

export const register = async (data: RegisterData): Promise<User> => {
  const response = await api.post('api/v1/auth/register', data);
  return response.data;
};
