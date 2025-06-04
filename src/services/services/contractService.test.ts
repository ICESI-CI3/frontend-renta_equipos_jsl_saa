import * as contractService from './contractService';
import axios from 'axios';

jest.mock('axios', () => {
  const mAxiosInstance = {
    get: jest.fn(),
    patch: jest.fn(),
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() }
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

describe('contractService', () => {
  const mockedAxios = axios.create();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('getAllContracts calls API and returns data', async () => {
    (mockedAxios.get as jest.Mock).mockResolvedValueOnce({ data: [{ id: 1, name: 'Contrato' }] });
    const data = await contractService.getAllContracts();
    expect(mockedAxios.get).toHaveBeenCalledWith('/api/v1/contracts');
    expect(data).toEqual([{ id: 1, name: 'Contrato' }]);
  });

  it('getContractsByUserEmail calls API and returns data', async () => {
    (mockedAxios.get as jest.Mock).mockResolvedValueOnce({ data: [{ id: 2, name: 'Contrato2' }] });
    const data = await contractService.getContractsByUserEmail('test@mail.com');
    expect(mockedAxios.get).toHaveBeenCalledWith('/api/v1/contracts/by-email/test@mail.com');
    expect(data).toEqual([{ id: 2, name: 'Contrato2' }]);
  });

  it('getContractDevicesByContractId calls API and returns data', async () => {
    (mockedAxios.get as jest.Mock).mockResolvedValueOnce({ data: [{ deviceId: 3 }] });
    const data = await contractService.getContractDevicesByContractId('abc123');
    expect(mockedAxios.get).toHaveBeenCalledWith('/api/v1/contract-devices/by-contract/abc123');
    expect(data).toEqual([{ deviceId: 3 }]);
  });

  it('endContract calls API and returns data', async () => {
    (mockedAxios.patch as jest.Mock).mockResolvedValueOnce({ data: { success: true } });
    const data = await contractService.endContract('xyz789');
    expect(mockedAxios.patch).toHaveBeenCalledWith('/api/v1/users/end-contract/xyz789');
    expect(data).toEqual({ success: true });
  });
});
