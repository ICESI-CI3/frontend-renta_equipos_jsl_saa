import * as deviceService from './deviceService';
import axios from 'axios';

jest.mock('axios', () => {
  const mAxiosInstance = {
    get: jest.fn(),
    post: jest.fn(),
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

describe('deviceService', () => {
  const mockedAxios = axios.create();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('getAllDevices llama a la API y retorna data', async () => {
    (mockedAxios.get as jest.Mock).mockResolvedValueOnce({ data: [{ id: 1, name: 'Laptop' }] });
    const data = await deviceService.getAllDevices();
    expect(mockedAxios.get).toHaveBeenCalledWith('/api/v1/devices');
    expect(data).toEqual([{ id: 1, name: 'Laptop' }]);
  });

  it('createDevice llama a la API y retorna data', async () => {
    (mockedAxios.post as jest.Mock).mockResolvedValueOnce({ data: { id: 2, name: 'Proyector' } });
    const data = await deviceService.createDevice(5, { name: 'Proyector' });
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/v1/devices/5', { name: 'Proyector' });
    expect(data).toEqual({ id: 2, name: 'Proyector' });
  });

  it('getDeviceByName llama a la API y retorna data', async () => {
    (mockedAxios.get as jest.Mock).mockResolvedValueOnce({ data: { id: 3, name: 'Tablet' } });
    const data = await deviceService.getDeviceByName('Tablet');
    expect(mockedAxios.get).toHaveBeenCalledWith('/api/v1/devices/by-name/Tablet');
    expect(data).toEqual({ id: 3, name: 'Tablet' });
  });

  it('getDeviceByStatus llama a la API y retorna data', async () => {
    (mockedAxios.get as jest.Mock).mockResolvedValueOnce({ data: [{ id: 4, status: 'disponible' }] });
    const data = await deviceService.getDeviceByStatus('disponible');
    expect(mockedAxios.get).toHaveBeenCalledWith('/api/v1/devices/by-status/disponible');
    expect(data).toEqual([{ id: 4, status: 'disponible' }]);
  });
});
