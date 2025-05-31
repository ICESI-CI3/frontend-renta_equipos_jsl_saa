import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const acceptRequest = async (idRequest: string) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const response = await api.patch(
    `/api/v1/users/accept/${idRequest}`,
    {},
    token ? { headers: { Authorization: `Bearer ${token}` } } : {}
  );
  return response.data;
};

export const rejectRequest = async (idRequest: string) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const response = await api.patch(
    `/api/v1/users/reject/${idRequest}`,
    {},
    token ? { headers: { Authorization: `Bearer ${token}` } } : {}
  );
  return response.data;
};

export default api;