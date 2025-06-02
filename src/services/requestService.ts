import axios from 'axios';
import { getToken } from '@/utils';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createRequest = async (data: {
  user_email: string;
  date_Start: string;
  date_Finish: string;
  status?: string;
  admin_comment?: string;
}) => {
  const response = await api.post('/api/v1/requests', {
    ...data,
    status: data.status || 'pendiente',
  });
  return response.data;
};

export const getAllRequests = async () => {
  const response = await api.get('/api/v1/requests');
  return response.data;
};

export const acceptRequest = async (idRequest: string) => {
  const token = getToken();
  const response = await api.patch(
    `/api/v1/users/accept/${idRequest}`,
    {},
    token ? { headers: { Authorization: `Bearer ${token}` } } : {}
  );
  return response.data;
};

export const rejectRequest = async (idRequest: string) => {
  const token = getToken();
  const response = await api.patch(
    `/api/v1/users/reject/${idRequest}`,
    {},
    token ? { headers: { Authorization: `Bearer ${token}` } } : {}
  );
  return response.data;
};

export default api;
