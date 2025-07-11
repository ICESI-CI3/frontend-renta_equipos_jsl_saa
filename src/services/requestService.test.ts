import * as requestService from './requestService';
import axios from 'axios';

jest.mock('axios', () => {
  const mAxiosInstance = {
    post: jest.fn(),
    get: jest.fn(),
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

describe('requestService', () => {
  const mockedAxios = axios.create();

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('createRequest llama a la API y retorna data', async () => {
    (mockedAxios.post as jest.Mock).mockResolvedValueOnce({ data: { id: 1, status: 'pendiente' } });
    const data = await requestService.createRequest({ user_email: 'a@a.com', date_Start: '2025-06-03', date_Finish: '2025-06-04' });
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/v1/requests', expect.objectContaining({ user_email: 'a@a.com' }));
    expect(data).toEqual({ id: 1, status: 'pendiente' });
  });

  it('acceptRequest llama a la API y retorna data', async () => {
    (mockedAxios.patch as jest.Mock).mockResolvedValueOnce({ data: { ok: true } });
    const data = await requestService.acceptRequest('123');
    expect(mockedAxios.patch).toHaveBeenCalledWith(
      '/api/v1/users/accept/123',
      {},
      expect.any(Object)
    );
    expect(data).toEqual({ ok: true });
  });

  it('rejectRequest llama a la API y retorna data', async () => {
    (mockedAxios.patch as jest.Mock).mockResolvedValueOnce({ data: { ok: false } });
    const data = await requestService.rejectRequest('456');
    expect(mockedAxios.patch).toHaveBeenCalledWith(
      '/api/v1/users/reject/456',
      {},
      expect.any(Object)
    );
    expect(data).toEqual({ ok: false });
  });

  it('getAllRequests llama a la API y retorna data', async () => {
    (mockedAxios.get as jest.Mock).mockResolvedValueOnce({ data: [{ id: 1, status: 'pendiente' }] });
    const data = await requestService.getAllRequests();
    expect(mockedAxios.get).toHaveBeenCalledWith('/api/v1/requests');
    expect(data).toEqual([{ id: 1, status: 'pendiente' }]);
  });

  it('createRequest lanza error si la API falla', async () => {
    (mockedAxios.post as jest.Mock).mockRejectedValueOnce(new Error('API error'));
    await expect(requestService.createRequest({ user_email: 'a@a.com', date_Start: '2025-06-03', date_Finish: '2025-06-04' })).rejects.toThrow('API error');
  });

  it('getAllRequests lanza error si la API falla', async () => {
    (mockedAxios.get as jest.Mock).mockRejectedValueOnce(new Error('API error'));
    await expect(requestService.getAllRequests()).rejects.toThrow('API error');
  });

  it('acceptRequest lanza error si la API falla', async () => {
    (mockedAxios.patch as jest.Mock).mockRejectedValueOnce(new Error('API error'));
    await expect(requestService.acceptRequest('123')).rejects.toThrow('API error');
  });

  it('rejectRequest lanza error si la API falla', async () => {
    (mockedAxios.patch as jest.Mock).mockRejectedValueOnce(new Error('API error'));
    await expect(requestService.rejectRequest('456')).rejects.toThrow('API error');
  });
});
