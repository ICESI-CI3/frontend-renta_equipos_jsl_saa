"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { login as loginService, logout as logoutService } from '@/services';
import { decodeJWT, isTokenExpired } from '../utils/jwt';

interface User {
  email: string;
  role: string;
  username: string;
  sub: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  isLoading: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
    isLoading: true,
  });
  const router = useRouter();  // Función para verificar el estado de autenticación
  const checkAuth = useCallback(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      console.log('🔍 CHECKAUTH: Current token:', token);

      if (token && !isTokenExpired(token)) {
        const decoded = decodeJWT(token);
        console.log('🔍 CHECKAUTH: Decoded token:', decoded);
        
        if (decoded && decoded.username && decoded.role) {
          console.log('🟢 CHECKAUTH: Setting user as authenticated');
          setAuthState({
            isAuthenticated: true,
            user: { 
              email: decoded.username, // El username es el email
              role: decoded.role,
              username: decoded.username,
              sub: decoded.sub
            },
            token,
            isLoading: false,
          });
        } else {
          // Token inválido o corrupto
          console.log('🟠 CHECKAUTH: Token invalid or corrupted, removing');
          localStorage.removeItem('token');
          setAuthState({
            isAuthenticated: false,
            user: null,
            token: null,
            isLoading: false,
          });
        }
      } else {
        // Token expirado o no existe
        console.log('🔴 CHECKAUTH: No token or expired, setting as unauthenticated');
        localStorage.removeItem('token');
        setAuthState({
          isAuthenticated: false,
          user: null,
          token: null,
          isLoading: false,
        });
      }
    }
  }, []);

  const login = async (credentials: { email: string; password: string }) => {
    try {
      const response = await loginService(credentials);
      
      if (response && response.access_token) {
        const token = response.access_token;
        localStorage.setItem('token', token);
        
        // Decodificar el token para obtener la información del usuario
        const decoded = decodeJWT(token);
        
        if (decoded && decoded.username && decoded.role) {
          setAuthState({
            isAuthenticated: true,
            user: { 
              email: decoded.username, // El username es el email
              role: decoded.role,
              username: decoded.username,
              sub: decoded.sub
            },
            token,
            isLoading: false,
          });
          
          return { success: true };
        } else {
          // Token inválido
          localStorage.removeItem('token');
          return { success: false, error: 'Token inválido recibido del servidor' };
        }
      }
    } catch (error) {
      console.error('Error en login:', error);
      return { success: false, error: 'Credenciales inválidas' };
    }
  };  // Función de logout
  const logout = useCallback(() => {
    console.log('🔴 LOGOUT: Starting logout process');
    console.log('🔴 LOGOUT: Token before logout:', localStorage.getItem('token'));
    
    logoutService();
    localStorage.removeItem('token'); // Solo necesitamos limpiar el token
    
    console.log('🔴 LOGOUT: Token after logout:', localStorage.getItem('token'));
    
    setAuthState({
      isAuthenticated: false,
      user: null,
      token: null,
      isLoading: false,
    });
    
    console.log('🔴 LOGOUT: Auth state set to false, redirecting to login');
    router.push('/login');
  }, [router]);

  // Verificar autenticación al cargar
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Escuchar cambios en localStorage (para múltiples pestañas)
  useEffect(() => {
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [checkAuth]);

  return {
    ...authState,
    login,
    logout,
    checkAuth,
  };
};