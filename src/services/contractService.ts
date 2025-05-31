import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAllContracts = async () => {
  const response = await api.get('/api/v1/contracts');
  return response.data;
};

export const getContractsByUserEmail = async (email: string) => {
  const response = await api.get(`/api/v1/contracts/by-email/${email}`);
  return response.data;
};

export const getContractDevicesByContractId = async (contractId: string) => {
  // Endpoint correcto para obtener solo los devices de ese contrato
  const response = await api.get(`/api/v1/contract-devices/by-contract/${contractId}`);
  return response.data;
};

export default api;
