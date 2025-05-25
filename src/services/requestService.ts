import axios from 'axios';

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

export default api;
