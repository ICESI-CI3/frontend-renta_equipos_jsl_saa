import axios from "axios";
import { getToken } from '@/utils';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const acceptRequestUser = async (idRequest: string) => {
  const token = getToken();
  const response = await api.patch(
    `/api/v1/users/accept/${idRequest}`,
    {},
    token ? { headers: { Authorization: `Bearer ${token}` } } : {}
  );
  return response.data;
};

export const rejectRequestUser = async (idRequest: string) => {
  const token = getToken();
  const response = await api.patch(
    `/api/v1/users/reject/${idRequest}`,
    {},
    token ? { headers: { Authorization: `Bearer ${token}` } } : {}
  );
  return response.data;
};

export default api;