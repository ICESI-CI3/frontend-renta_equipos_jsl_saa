// Mock axios.create para devolver un objeto con interceptors antes de importar el servicio
jest.mock('axios', () => {
  const mAxiosInstance = {
    post: jest.fn(),
    get: jest.fn(),
    interceptors: {
      request: { use: jest.fn() }
    }
  };
  return {
    create: jest.fn(() => mAxiosInstance),
    isAxiosError: jest.fn(),
    default: {
      create: jest.fn(() => mAxiosInstance)
    }
  };
});

import * as authService from './authService';
import axios from 'axios';

const mockedAxios = axios.create();

beforeEach(() => {
  jest.clearAllMocks();
  localStorage.clear();
});

(mockedAxios.post as jest.Mock).mockClear();
(mockedAxios.get as jest.Mock).mockClear();

describe('authService', () => {
  it('register llama a la API y retorna data', async () => {
    (mockedAxios.post as jest.Mock).mockResolvedValueOnce({ data: { success: true } });
    const data = await authService.register({ email: 'test@test.com' });
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/v1/auth/register', { email: 'test@test.com' });
    expect(data).toEqual({ success: true });
  });

  it('login llama a la API y retorna data', async () => {
    (mockedAxios.post as jest.Mock).mockResolvedValueOnce({ data: { token: 'abc' } });
    const data = await authService.login({ email: 'test@test.com' });
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/v1/auth/login', { email: 'test@test.com' });
    expect(data).toEqual({ token: 'abc' });
  });

  it('logout limpia el localStorage', () => {
    localStorage.setItem('token', 'abc');
    authService.logout();
    expect(localStorage.getItem('token')).toBeNull();
  });

  it('getRoleByEmail llama a la API y retorna data', async () => {
    (mockedAxios.get as jest.Mock).mockResolvedValueOnce({ data: { role: 'admin' } });
    const data = await authService.getRoleByEmail('test@test.com');
    expect(mockedAxios.get).toHaveBeenCalledWith('/api/v1/auth/email-role/test@test.com');
    expect(data).toEqual({ role: 'admin' });
  });

  it('getRoleByEmail lanza error si no hay email', async () => {
    await expect(authService.getRoleByEmail('')).rejects.toThrow('Email not found in localStorage');
  });
});
