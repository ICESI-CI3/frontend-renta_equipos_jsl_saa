import * as userService from './userService';
import axios from 'axios';

jest.mock('axios', () => {
  const mAxiosInstance = {
    patch: jest.fn(),
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

describe('userService', () => {
  const mockedAxios = axios.create();

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('acceptRequestUser llama a la API y retorna data', async () => {
    (mockedAxios.patch as jest.Mock).mockResolvedValueOnce({ data: { ok: true } });
    const data = await userService.acceptRequestUser('123');
    expect(mockedAxios.patch).toHaveBeenCalledWith(
      '/api/v1/users/accept/123',
      {},
      expect.any(Object)
    );
    expect(data).toEqual({ ok: true });
  });

  it('rejectRequestUser llama a la API y retorna data', async () => {
    (mockedAxios.patch as jest.Mock).mockResolvedValueOnce({ data: { ok: false } });
    const data = await userService.rejectRequestUser('456');
    expect(mockedAxios.patch).toHaveBeenCalledWith(
      '/api/v1/users/reject/456',
      {},
      expect.any(Object)
    );
    expect(data).toEqual({ ok: false });
  });
});
