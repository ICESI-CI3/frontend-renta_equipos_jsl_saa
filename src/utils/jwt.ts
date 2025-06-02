// src/utils/jwt.ts

// Función para decodificar JWT sin verificar la firma (solo para leer el payload)
export const decodeJWT = (token: string): any => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decodificando JWT:', error);
    return null;
  }
};

// Función para verificar si el token ha expirado
export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = decodeJWT(token);
    if (!decoded || !decoded.exp) return true;
    
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch (error) {
    return true;
  }
};

// Función centralizada para obtener el token desde localStorage
export const getToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
};

// Función para obtener el email del usuario desde el token
export const getUserEmailFromToken = (): string => {
  const token = getToken();
  if (!token || isTokenExpired(token)) return '';
  
  const decoded = decodeJWT(token);
  return decoded?.username || '';
};

// Función para obtener el rol del usuario desde el token
export const getUserRoleFromToken = (): string => {
  const token = getToken();
  if (!token || isTokenExpired(token)) return '';
  
  const decoded = decodeJWT(token);
  return decoded?.role || '';
};

// Función para obtener toda la información del usuario desde el token
export const getUserFromToken = (): { username: string; role: string; sub: string } | null => {
  const token = getToken();
  if (!token || isTokenExpired(token)) return null;
  
  const decoded = decodeJWT(token);
  if (!decoded?.username || !decoded?.role) return null;
  
  return {
    username: decoded.username,
    role: decoded.role,
    sub: decoded.sub
  };
};
